// import groupImg from "@/assets/group-img.png";
import groupImg from "@/assets/react.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
      name: string;
      src?: string;
      size?: string;
      isOnline?: boolean;
      isGroup?: boolean;
      className?: string;
};

const AvatarWithBadge = ({ name, src, size = "w-9 h-9", isOnline, isGroup = false, className }: Props) => {
      const avatar = isGroup ? groupImg : src || "";
      return (
            <div className="relative shrink-0">
                  <Avatar className={size}>
                        <AvatarImage src={avatar} />
                        <AvatarFallback className={cn(`bg-primary/10 font-semibold text-primary`,
                              className && className
                        )} >
                              {name?.charAt(0)}
                        </AvatarFallback>
                  </Avatar>
                  {isOnline && !isGroup && (
                        <span className="h-2.5 w-2.5 absolute bottom-0 right-0 border-2 bg-green-500 rounded-full" />
                  )}
            </div>
      )
}

export default AvatarWithBadge