/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from "@/hooks/use-chat";
import { useSocket } from "@/hooks/use-socket";
import type { MessageType } from "@/types/chat.type";
import { useEffect, useRef, useState } from "react";
import { ChatBodyMessage } from "./chat-body-message";

interface Props {
      chatId: string | null;
      messages: MessageType[];
      onReply: (message: MessageType) => void;
}

const ChatBody = ({ chatId, messages, onReply }: Props) => {
      const { socket } = useSocket();
      const { addNewMessage, addOrUpdateMessage } = useChat();
      const bottomRef = useRef<HTMLDivElement | null>(null);
      const [_, setAiChunk] = useState<string>("");

      useEffect(() => {
            if (!chatId) return;
            if (!socket) return;

            const handleNewMessage = (msg: MessageType) => addNewMessage(chatId, msg)

            socket.on("message:new", handleNewMessage);
            return () => {
                  socket.off("message:new", handleNewMessage);
            }
      }, [socket, chatId, addNewMessage]);

      useEffect(() => {
            if (!chatId) return;
            if (!socket) return;

            const handleAIStream = ({
                  chatId: streamChatId,
                  chunk,
                  done,
                  message
            }: any) => {
                  if (streamChatId !== chatId) return;

                  const lastMsg = messages.at(-1);
                  if (lastMsg?._id && lastMsg.streaming) return;

                  if (chunk?.trim() && !done) {
                        setAiChunk(prev => {
                              const newContent = prev + chunk;
                              addOrUpdateMessage(
                                    chatId,
                                    {
                                          ...lastMsg,
                                          content: newContent
                                    } as MessageType,
                                    lastMsg?._id
                              );
                              return newContent;
                        });
                        return;
                  };
                  if (done) {
                        console.log("AI full-message", message);
                        setAiChunk("")
                  };
            };

            socket.on("chat:ai", handleAIStream);

            return () => {
                  socket.off("chat:ai", handleAIStream);
            };
      }, [socket, addOrUpdateMessage, chatId, messages]);

      useEffect(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);


      return (
            <div className="flex-1 overflow-hidden">
                  <div className="max-h-screen h-auto overflow-y-auto">
                        <div className="w-full h-full max-w-6xl mx-auto flex flex-col px-3">
                              {messages?.map((message) => (
                                    <ChatBodyMessage
                                          key={message._id}
                                          message={message}
                                          onReply={onReply} />
                              ))}
                        </div>
                        <br />
                        <br />
                        <div ref={bottomRef} />
                  </div>
            </div>
      )
}

export default ChatBody