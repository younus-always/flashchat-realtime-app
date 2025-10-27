import jwt, { SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env.config";
import { Response } from "express";


type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;
type Cookie = {
      res: Response;
      userId: string;
};

export const setJwtAuthCookie = ({ res, userId }: Cookie) => {
      const payload = { userId };
      const expiresIn = envVars.JWT_EXPIRERS as Time;
      const token = jwt.sign(payload, envVars.JWT_SECRET_TOKEN, {
            audience: ["User"],
            expiresIn
      } as SignOptions);

      return res.cookie("accessToken", token, {
            httpOnly: true,
            secure: envVars.NODE_ENV === "production" ? true : false,
            sameSite: envVars.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
      })
};

export const clearJwtAuthCookie = (res: Response) =>
      res.clearCookie("accessToken", { path: "/" });