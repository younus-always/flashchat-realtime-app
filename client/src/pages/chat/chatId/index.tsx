import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { useChat } from "@/hooks/use-chat";
import useChatId from "@/hooks/use-chat-id"
import { useSocket } from "@/hooks/use-socket";
import { MessageType } from "@/types/chat.type";
import { useEffect, useState } from "react";

const SingleChat = () => {
      const chatId = useChatId();
      const { user } = useAuth();
      const { fetchSingleChat, isSingleChatLoading, singleChat } = useChat();
      const { socket } = useSocket();
      const [replyTo, setReplyTo] = useState<MessageType | null>(null);

      const currentUser = user?._id || null;
      const chat = singleChat?.chat;
      const message = singleChat?.messages || [];

      useEffect(() => {
            if (!chatId) return;
            fetchSingleChat(chatId);
      }, [chatId, fetchSingleChat])

      // Socket chat room
      useEffect(() => {
            if (!chatId || !socket) return;

            socket.emit("chat:join", chatId);
            return () => {
                  socket.emit("chat:leave", chatId)
            }
      }, [chatId, socket])


      if (isSingleChatLoading) {
            return (
                  <div className="h-screen flex items-center justify-center">
                        <Spinner className="w-11 h-11 text-primary!" />
                  </div>
            )
      };

      if (!chat) {
            return (
                  <div className="h-screen flex items-center justify-center">
                        <p className="text-lg">Chat not found</p>
                  </div>
            )
      };

      return (
            <div className="h-full">
                  <div className="relative h-svh flex flex-col overflow-hidden">

                  </div>
            </div>
      )
}

export default SingleChat