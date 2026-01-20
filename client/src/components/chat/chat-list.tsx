import { useChat } from "@/hooks/use-chat"
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import ChatListItem from "./chat-list-item";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import ChatListHeader from "./chat-list-header";

const ChatList = () => {
      const { fetchChats, chats, isChatsLoading } = useChat();
      const [searchQuery, setSearchQuery] = useState("");
      const navigate = useNavigate();
      const { user } = useAuth();
      const currentUserId = user?._id || null;

      const onRoute = (id: string) => {
            navigate(`chat/${id}`)
      };

      const filteredChats = chats?.filter((chat) =>
            chat.groupName?.toLowerCase().includes(searchQuery.toLowerCase())
            || chat.participants?.some(p =>
                  p._id !== currentUserId && p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      ) || [];

      useEffect(() => {
            fetchChats()
      }, [fetchChats]);


      return (
            <div className="fixed inset-y-0 *:pb-20 lg:pb-0 lg:max-w-94.75 lg:block border-r border-border bg-sidebar max-w-[calc(100%-40px)] w-full left-10 z-98">
                  <div className="flex flex-col">
                        <ChatListHeader onSearch={setSearchQuery} />

                        <div className="h-[calc(100vh-100px)] flex-1 overflow-y-auto">
                              <div className="px-2 pb-10 pt-1 space-y-1">
                                    {isChatsLoading ? (
                                          <div className="flex items-center justify-center">
                                                <Spinner className="w-7 h-7" />
                                          </div>
                                    ) : filteredChats.length === 0 ? (
                                          <div className="flex items-center justify-center">
                                                {searchQuery ? "No chat found" : "No chats created"}
                                          </div>
                                    ) : (
                                          filteredChats.map((chat) => (
                                                <ChatListItem
                                                      key={chat._id}
                                                      chat={chat}
                                                      currentUserId={currentUserId}
                                                      onClick={() => onRoute(chat._id)}
                                                />
                                          ))
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ChatList