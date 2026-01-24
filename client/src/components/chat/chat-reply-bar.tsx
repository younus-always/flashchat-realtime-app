import type { MessageType } from "@/types/chat.type"

interface Props {
      replyTo: MessageType | null;
      currentUserId: string | null;
      onCancel: () => void;
}

const ChatReplyBar = ({ replyTo, currentUserId, onCancel }: Props) => {
      return (
            <div>ChatReplyBar</div>
      )
}

export default ChatReplyBar