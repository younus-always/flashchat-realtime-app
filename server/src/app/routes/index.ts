import { Router } from "express";
import authRoutes from "./auth.route";
import chatRoutes from "./chat.route";
import { userRoutes } from "./user.route";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/chat",chatRoutes);
router.use("/user",userRoutes);