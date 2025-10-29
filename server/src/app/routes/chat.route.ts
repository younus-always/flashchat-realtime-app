import { Router } from "express";
import { createChatController, getSingleChatController, getUserChatsController } from "../controllers/chat.controller";
import { passportAuthenticateJwt } from "../config/passport.config";
import { sendMessageController } from "../controllers/message.controller";

const chatRoutes = Router()
      .use(passportAuthenticateJwt)
      .post("/create", createChatController)
      .post("/message/send", sendMessageController)
      .get("/all", getUserChatsController)
      .get("/:id", getSingleChatController)

export default chatRoutes;