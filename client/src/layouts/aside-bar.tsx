import AvatarWithBadge from "@/components/avatar-with-badge";
import Logo from "@/components/logo";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth"
import { isUserOnline } from "@/lib/helper";
import { PROTECTED_ROUTES } from "@/routes/routes";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Moon, Sun } from "lucide-react";

const AsideBar = () => {
      const { user, logout } = useAuth();
      const { theme, setTheme } = useTheme();

      const isOnline = isUserOnline(user?._id);

      return (
            <aside className="w-11 h-svh top-0 left-0 fixed inset-y-0 bg-primary/85 shadow-sm z-9999">
                  <div className="w-full h-full px-1 pt-1 pb-6 flex flex-col items-center justify-between">
                        <Logo url={PROTECTED_ROUTES.CHAT} imgClass="size-7" textClass="text-white" showText={false} />
                        <div className="flex flex-col items-center gap-3">
                              <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                    className="border-0 rounded-full"
                              >
                                    <Sun className="w-[1.2rem] h-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-right-90" />
                                    <Moon className="w-[1.2rem] h-[1.2rem] absolute scale-0 rotate-90 transition-all dark:scale-100 dark:right-3.5 " />
                              </Button>

                              <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                          <div role="button">
                                                {/* Avatar */}
                                                {<AvatarWithBadge
                                                      name={user?.name || "unknown"}
                                                      src={user?.avatar || ""}
                                                      isOnline={isOnline}
                                                      className="bg-white!" />}
                                          </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 rounded-lg z-9999">
                                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                              </DropdownMenu>
                        </div>
                  </div>
            </aside>
      )
}

export default AsideBar