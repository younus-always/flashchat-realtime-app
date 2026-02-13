import "dotenv/config";
import { connectDatabase } from "../config/database.config";
import { UserModel } from "../models/user.model";

export const CreateFlashChatAI = async () => {
      const existingAI = await UserModel.findOne({ isAI: true });
      if (existingAI) {
            await UserModel.deleteOne({ _id: existingAI._id });
      };
      const flashChatAI = await UserModel.create({
            name: "FlashChat AI",
            isAI: true,
            avatar: "https://res.cloudinary.com/dp9vvlndo/image/upload/v1234324523/ai-logo.png" // AI avatar url
      });
      console.log("✅ FlashChat AI created:", flashChatAI._id);
      return flashChatAI;
};

const seedFlashChatAI = async () => {
      try {
            await connectDatabase();
            await CreateFlashChatAI();
            console.log("Seeding Completed");
            process.exit(0)
      } catch (error) {
            console.error("Seeding failed:", error);
            process.exit(1);
      }
};