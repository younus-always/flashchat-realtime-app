import { Outlet } from "react-router"

const BaseLayout = () => {
      return (
            <div className="w-full h-full flex flex-col">
                  <div className="w-full h-full flex items-center justify-center">
                        <div className="w-full h-auto mx-auto">
                              <Outlet />
                        </div>
                  </div>
            </div>
      )
}

export default BaseLayout