import { Router } from "express";
import authRoutes from "./auth.route";

export const router = Router();

router.use("/auth", authRoutes);
