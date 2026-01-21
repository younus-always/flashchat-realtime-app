import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import type { MessageType } from "@/types/chat.type"
import AvatarWithBadge from "../avatar-with-badge";
import { formateChatTime } from "@/lib/helper";
import { Button } from "../ui/button";
import { ReplyIcon } from "lucide-react";

interface Props {
      message: MessageType;
      onReply: (message: MessageType) => void;
}

const ChatBodyMessage = ({ message, onReply }: Props) => {
      const { user } = useAuth();

      const userId = user?._id || null;
      const isCurrentUser = message.sender?._id === userId;
      const senderName = isCurrentUser ? "You" : message.sender?.name;

      const replySenderName = message.replyTo?.sender === userId
            ? "You"
            : message.replyTo?.sender?.name;

      const containerClass = cn(
            "flex gap-2 group py-3 px-4",
            isCurrentUser && "text-left flex-row-reverse"
      );

      const contentWrapperClass = cn(
            "max-w-[70%] flex flex-col relative",
            isCurrentUser && "items-end"
      );

      const messageClass = cn(
            "max-w-[200px] px-3 py-2 text-sm shadow-sm break-words",
            isCurrentUser
                  ? "bg-accent dark:bg-primary/40 rounded-tr-xl rounded-l-xl"
                  : "bg-[#f5f5f5] dark:bg-accent rounded-bl-xl rounded-r-xl"
      );

      const replyBoxClass = cn(
            "mb-2 p-2 text-xs rounded-md shadow-md border-l-4 text-left!",
            isCurrentUser
                  ? "bg-primary/20 border-l-primary"
                  : "bg-gray-200 dark:bg-secondary border-l-[#cc4a31]"
      );


      return (
           <div></div>
      )
}

export default ChatBodyMessage