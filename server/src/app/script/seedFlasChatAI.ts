import "dotenv/config";
import { connectDatabase } from "../config/database.config";
import { UserModel } from "../models/user.model";

export const CreateFlashChatAI = async () => {
      let FlashChatAI = await UserModel.findOne({ isAI: true });
      if (FlashChatAI) {
            console.log("✅ FlashChat AI already exists");
            return FlashChatAI;
      };
      FlashChatAI = await UserModel.create({
            name: "FlashChat AI",
            isAI: true,
            avatar: "https://res.cloudinary.com/dp9vvlndo/image/upload/v1234324523/ai-logo.png" // AI avatar url
      });
      console.log("✅ FlashChat AI created:", FlashChatAI._id);
      return FlashChatAI;
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