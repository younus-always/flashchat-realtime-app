import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { sendMessageSchema } from "../validators/message.validator";
import { sendMessageService } from "../services/message.service";

export const sendMessageController = asyncHandler(async (req: Request, res: Response) => {
      const userId = req.user?._id as string;
      const body = sendMessageSchema.parse(req.body);
      const result = await sendMessageService(userId, body);

      res.status(HTTPSTATUS.CREATED).json({
            message: "Message sent successfully",
            ...result
      })
});