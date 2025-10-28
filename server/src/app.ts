import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { envVars } from "./app/config/env.config";
import { errorHandler } from "./app/middlewares/errorHandler.middleware";
import routes from "./app/routes";
import "./app/config/passport.config";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
      origin: envVars.FRONTEND_ORIGIN,
      credentials: true
}));
app.use(passport.initialize());

// Routes
app.use("/api", routes);


// Main Route
app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            message: "Welcome to FlashChat Realtime Chat App Server"
      })
});

app.use(errorHandler)

export default app;