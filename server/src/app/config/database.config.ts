import mongoose from "mongoose";
import { envVars } from "./env.config";

export const connectDatabase = async () => {
      try {
            await mongoose.connect(envVars.MONGO_URI);
            console.log("Database connected");
      } catch (error) {
            console.log("Database connection error:", error);
            process.exit(1);
      }
};