import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService } from "../services/auth.service";
import { clearJwtAuthCookie, setJwtAuthCookie } from "../utils/cookie";
import { HTTPSTATUS } from "../config/http.config";

export const registerController = asyncHandler(async (req: Request, res: Response) => {
      const body = registerSchema.parse(req.body);
      const user = await registerService(body);
      const userId = user._id as string;

      setJwtAuthCookie({ res, userId })
            .status(HTTPSTATUS.CREATED).json({
                  message: "User created & login successfully",
                  user
            });
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
      const body = loginSchema.parse(req.body);
      const user = await loginService(body);
      const userId = user._id as string;

      setJwtAuthCookie({ res, userId })
            .status(HTTPSTATUS.OK)
            .json({
                  message: "User logged In successfully",
                  user
            });
});

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
      clearJwtAuthCookie(res)
            .status(HTTPSTATUS.OK)
            .json({
                  message: "User logout successfully",
            });
});

export const authStatusController = asyncHandler(async (req: Request, res: Response) => {
      const user = req.user;
      res.status(HTTPSTATUS.OK).json({
            message: "Authenticated User",
            user
      })
});