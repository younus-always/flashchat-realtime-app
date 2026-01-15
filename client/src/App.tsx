import { useEffect } from "react";
import { useAuth } from "./hooks/use-auth"
import AppRoutes from "./routes"
import Logo from "./components/logo";
import { Spinner } from "./components/ui/spinner";
import { useLocation } from "react-router-dom";
import { isAuthRoute } from "./routes/routes";
import { useSocket } from "./hooks/use-socket";

const App = () => {
  const { user, isAuthStatus, isAuthStatusLoading } = useAuth();
  const { pathname } = useLocation();
  const { onlineUsers } = useSocket();
  const isAuth = isAuthRoute(pathname);

  console.log("onlineUsers", onlineUsers);

  useEffect(() => {
    isAuthStatus()
  }, [isAuthStatus])

  if (isAuthStatusLoading && !user && !isAuth) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        {/* <Logo imgClass="size-20" showText={false} /> */}
        <Spinner className="w-6 h-6" />
      </div>
    )
  }

  return <AppRoutes />
}

export default App