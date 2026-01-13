import AppWrapper from "@/components/app-wrapper"
import { Outlet } from "react-router"

const AppLayout = () => {
      return (
            <AppWrapper>
                  <div className="h-full"><Outlet /></div>
            </AppWrapper>
      )
}

export default AppLayout