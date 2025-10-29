import cloudinary from "../config/cloudinary.config";
import { ChatModel } from "../models/chat.model";
import { MessageModel } from "../models/message.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";

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
      // websocket

      return { userMessage: newMessage, chat };
};