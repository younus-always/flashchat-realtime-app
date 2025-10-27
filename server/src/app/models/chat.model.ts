import mongoose, { Document, model, Schema } from "mongoose";

export interface ChatDocument extends Document {
      participants: mongoose.Types.ObjectId[];
      lastMessage: mongoose.Types.ObjectId;
      isGroup: boolean;
      groupName: string;
      createdBy: mongoose.Types.ObjectId;
      createdAt: Date,
      updatedAt: Date
};

const chatSchema = new Schema<ChatDocument>({
      participants: [
            {
                  type: String,
                  ref: "User",
                  required: true
            }
      ],
      lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null
      },
      isGroup: { type: Boolean, default: false },
      groupName: { type: String },
      createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default:null
      },
}, {
      versionKey: false,
      timestamps: true
});

export const ChatModel = model<ChatDocument>("Chat", chatSchema);