import BaseLayout from "@/layouts/base-layout";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
      return (
            <Routes>
                  {/* Auth / Public routes */}
                  <Route path="/">
                        <Route element={<BaseLayout />}>

                        </Route>
                  </Route>
            </Routes>
      )
};

export default AppRoutes;