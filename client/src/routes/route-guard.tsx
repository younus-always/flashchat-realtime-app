import { useAuth } from "@/hooks/use-auth"
import { Navigate, Outlet } from "react-router-dom"

interface Props {
      requireAuth?: boolean
}

const RouteGuard = ({ requireAuth }: Props) => {
      const { user } = useAuth();

      if (!user && requireAuth) return <Navigate to={"/"} replace />
      if (user && !requireAuth) return <Navigate to={"/chat"} replace />

      return <Outlet />
}

export default RouteGuard