import { getOtherUserAndGroup } from "@/lib/helper";
import { PROTECTED_ROUTES } from "@/routes/routes";
import type { ChatType } from "@/types/chat.type";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AvatarWithBadge from "../avatar-with-badge";

interface Props {
      chat: ChatType;
      currentUserId: string | null;
};

const ChatHeader = ({ chat, currentUserId }: Props) => {
      const navigate = useNavigate();
      const { name, avatar, isGroup, subheading, isOnline } = getOtherUserAndGroup(chat, currentUserId);

      return (
            <div className="sticky top-0 flex items-center gap-5 border-b border-border bg-card px-2 z-50">
                  <div className="h-14 px-4 flex items-center">
                        <div>
                              <ArrowLeft onClick={() => navigate(PROTECTED_ROUTES.CHAT)} className="w-5 h-5 inline-block lg:hidden text-muted-foreground mr-2 cursor-pointer" />
                        </div>
                        <AvatarWithBadge name={name} src={avatar} isGroup={isGroup} isOnline={isOnline} />
                        <div className="ml-2">
                              <h5 className="font-semibold">{name}</h5>
                              <p className={`text-sm ${isOnline ? "text-gray-500" : "text-muted-foreground"
                                    }`}>{subheading}</p>
                        </div>
                  </div>
                  <div className={`h-full flex text-center py-4 font-medium border-b border-primary text-primary`}>
                        Chat
                  </div>
            </div>
      )
}

export default ChatHeader