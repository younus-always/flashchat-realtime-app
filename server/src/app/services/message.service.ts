import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.config";
import { ChatModel } from "../models/chat.model";
import { MessageModel } from "../models/message.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";
import { emitLastMessageToParticipants, emitNewMessageToChatRoom } from "../lib/socket";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { envVars } from "../config/env.config";
import { UserModel } from "../models/user.model";
import { ModelMessage, streamText } from "ai";

const google = createGoogleGenerativeAI({
      apiKey: envVars.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const sendMessageService = async (userId: string, payload: {
      chatId: string,
      content?: string,
      image?: string,
      replyToId?: string,
}) => {
      const { chatId, content, image, replyToId } = payload;
      const chat = await ChatModel.findOne({
            _id: chatId,
            participants: { $in: [userId] }
      });
      if (!chat) throw new BadRequestException("Chat not found or Unauthorized");
      if (replyToId) {
            const replyMessage = await MessageModel.findOne({
                  _id: replyToId,
                  chatId
            });
            if (!replyMessage) throw new NotFoundException("Reply message not found");
      };

      let imageUrl;
      if (image) {
            // upload the image to cloudinary  
            const uploadRes = await cloudinary.uploader.upload(image);
            console.log(uploadRes);
            imageUrl = uploadRes.secure_url;
      };

      const newMessage = await MessageModel.create({
            chatId,
            sender: userId,
            content,
            image: imageUrl,
            replyTo: replyToId || null
      });
      await newMessage.populate([
            { path: "sender", select: "name avatar" },
            {
                  path: "replyTo",
                  select: "content image sender",
                  populate: {
                        path: "sender",
                        select: "name avatar"
                  }
            }
      ]);

      chat.lastMessage = newMessage._id as mongoose.Types.ObjectId;
      await chat.save();

      // websocket emit the new message to the chat room
      emitNewMessageToChatRoom(userId, chatId, newMessage);


      // websocket emit the lastMessage
      const allParticipantIds = chat.participants.map(id => id.toString());
      emitLastMessageToParticipants(allParticipantIds, chatId, newMessage);

      let aiResponse: any = null;
      if (chat.isAIChat) {
            aiResponse = await getAIResponse(chatId, userId);
            if (aiResponse) {
                  chat.lastMessage = aiResponse._id as mongoose.Types.ObjectId;
                  await chat.save();
            }
      }

      return {
            userMessage: newMessage,
            chat,
            aiResponse,
            isAIChat: chat.isAIChat
      };
};


const getAIResponse = async (chatId: string, userId: string) => {
      const flashChatAI = await UserModel.findOne({ isAI: true });
      if (!flashChatAI) throw new NotFoundException("AI user not found");

      const chatHistory = await getChatHistory(chatId);
      const formattedMessages: ModelMessage[] = chatHistory.map((msg: any) => {
            const role = msg.sender.isAI ? "assistant" : "user";
            const parts: any[] = [];

            if (msg.image) {
                  parts.push({
                        type: "file",
                        data: msg.image,
                        mediaType: "image/png",
                        filename: "image.png"
                  });
                  if (!msg.content) {
                        parts.push({
                              type: "text",
                              text: "Describe what you see in the image"
                        })
                  }
            };

            if (msg.content) {
                  parts.push({
                        type: "text",
                        text: msg.replyTo
                              ? `[Replying-to: "${msg.replyTo.content}"]\n${msg.content}`
                              : msg.content
                  })
            };

            return { role, content: parts }
      });

      const result = await streamText({
            model: google("gemini-2.5-flash"),
            messages: formattedMessages,
            system: "You are FlashChat AI, a helpful and friendly assistant. Respond only with text attend to the last user message only."
      });

      let fullResponse = "";
      for await (const chunk of result.textStream) {
            emitChatAI({
                  chatId,
                  chunk,
                  sender: flashChatAI,
                  done: false,
                  message: null
            });
            fullResponse += chunk;
      };

      if (!fullResponse.trim()) return "";
      const aiMessage = await MessageModel.create({
            chatId,
            sender: flashChatAI._id,
            content: fullResponse
      });
      await aiMessage.populate("sender", "name avatar, isAI");

      // emit ai full response message
      emitChatAI({
            chatId,
            chunk: null,
            sender: flashChatAI,
            done: true,
            message: aiMessage
      });

      emitLastMessageToParticipants([userId], chatId, aiMessage);
      return aiMessage;
};

const getChatHistory = async (chatId: string) => {
      const messages = await MessageModel.find({ chatId })
            .populate("sender", "isAI")
            .populate("replyTo", "content")
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

      return messages.reverse();
};
