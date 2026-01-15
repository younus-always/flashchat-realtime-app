import { Outlet } from "react-router-dom"

interface Props {
      requireAuth?: boolean
}

const RouteGuard = ({ requireAuth }: Props) => {
      console.log("requiredAuth", requireAuth);
      return <Outlet />
}

export default RouteGuard