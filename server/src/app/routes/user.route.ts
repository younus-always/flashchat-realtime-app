import { Router } from "express";
import { getUsersController } from "../controllers/user.controller";
import { passportAuthenticateJwt } from "../config/passport.config";

const userRoutes = Router()
      .use(passportAuthenticateJwt)
      .get("/all", getUsersController)

export default userRoutes;