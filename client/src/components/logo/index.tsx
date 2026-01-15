import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
// import LogoSvg from "@/assets/logo.svg";

interface LogoProps {
      url?: string;
      showText?: boolean;
      imgClass?: string;
      textClass?: string;
};

const Logo = ({
      url = "/",
      showText = true,
      imgClass = "size=[30px]",
      textClass
}: LogoProps) => {

      return (
            <Link to={url} className="w-fit flex items-center gap-2">
                  <img src={""} alt="FlashChat" className={cn(imgClass)} />
                  {showText && (
                        <span className={cn("font-semibold text-lg leading-tight", textClass)}>FlashChat</span>
                  )}
            </Link>
      )
}

export default Logo