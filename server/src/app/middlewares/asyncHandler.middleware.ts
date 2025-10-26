import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env.config";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (fn: AsyncHandler) =>
      async (req: Request, res: Response, next: NextFunction) => {
            try {
                  await fn(req, res, next);
            } catch (error) {
                  if (envVars.NODE_ENV === "development")
                        console.log(`Error from asyncHandler: ${error}`);
                  next(error)
            }
      };