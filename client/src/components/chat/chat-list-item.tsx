import { useAuth } from "@/hooks/use-auth";
import type { ChatType } from "@/types/chat.type"
import { useLocation } from "react-router-dom";

interface Props {
      chat: ChatType;
      onclick?: () => void;
}

const ChatListItem = ({ chat, onclick }: Props) => {
      const { user } = useAuth();
      const { pathname } = useLocation();

      const { lastMessage, createdAt } = chat;
      const currentUserId = user?._id || null;

      return (
            <div>

            </div>
      )
}

export default ChatListItem