import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { chatIdSchema, createChatSchema } from "../validators/chat.validator";
import { createChatService, getSingleChatService, getUserChatsService } from "../services/chat.service";

export const createChatController = asyncHandler(async (req: Request, res: Response) => {
      const userId = req.user?._id as string;
      const body = createChatSchema.parse(req.body);
      const chat = await createChatService(userId, body);

      res.status(HTTPSTATUS.OK).json({
            message: "Chat created successfully",
            chat
      })
});

export const getUserChatsController = asyncHandler(async (req: Request, res: Response) => {
      const userId = req.user?._id as string;
      const chats = await getUserChatsService(userId);

      res.status(HTTPSTATUS.OK).json({
            message: "User chats retrieved successfully",
            chats
      })
});

export const getSingleChatController = asyncHandler(async (req: Request, res: Response) => {
      const userId = req.user?._id as string;
      const { id } = chatIdSchema.parse(req.params);
      const { chat, messages } = await getSingleChatService(id, userId);

      res.status(HTTPSTATUS.OK).json({
            message: "Single chat retrieved successfully",
            chat,
            messages
      })
});