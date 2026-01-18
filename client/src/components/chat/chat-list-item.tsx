import { formateChatTime, getOtherUserAndGroup } from "@/lib/helper";
import { cn } from "@/lib/utils";
import type { ChatType } from "@/types/chat.type"
import { useLocation } from "react-router-dom";
import AvatarWithBadge from "../avatar-with-badge";

interface Props {
      chat: ChatType;
      currentUserId: string | null;
      onclick?: () => void;
}

const ChatListItem = ({ chat, currentUserId, onclick }: Props) => {
      const { pathname } = useLocation();
      const { lastMessage, createdAt } = chat;
      const { name, avatar, isOnline, isGroup } = getOtherUserAndGroup(chat, currentUserId);

      const getLastMessageTest = () => {
            if (!lastMessage) {
                  return isGroup
                        ? chat.createdBY === currentUserId
                              ? "Group created"
                              : "You were added"
                        : "Send a message ";
            };

            if (lastMessage.image) return "📸 Photo";

            if (isGroup && lastMessage.sender) {
                  return `${lastMessage.sender._id === currentUserId ? "You" : lastMessage.sender.name}: ${lastMessage.content}`
            };

            return lastMessage.content;
      };

      return (
            <button onClick={onclick} className={cn(`w-full flex items-center gap-2 p-2 rounded-sm hover:bg-sidebar-accent transition-colors text-left`, pathname.includes(chat._id) && "bg-sidebar-accent!")}>
                  <AvatarWithBadge name={name} src={avatar} isGroup={isGroup} isOnline={isOnline} />
                  <div className="flex min-h-0">
                        <div className="flex items-center justify-center mb-0.5">
                              <h5 className="text-sm font-semibold truncate">{name}</h5>
                              <span className="text-xs ml-0 shrink-0 text-muted-foreground">{formateChatTime(lastMessage.updatedAt || createdAt)}</span>
                        </div>
                        <p className="text-xs ml-0 shrink-0 text-muted-foreground">{getLastMessageTest()}</p>
                  </div>
            </button>
      )
}

export default ChatListItem