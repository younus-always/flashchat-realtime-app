import AsideBar from "@/layouts/aside-bar"
import type { ReactNode } from "react"

interface Props {
      children: ReactNode
}

const AppWrapper = ({ children }: Props) => {
      return (
            <div className="h-full">
                  <AsideBar />
                  <main className="h-full lg:pl-10">{children}</main>
            </div>
      )
}

export default AppWrapper