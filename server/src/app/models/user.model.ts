import { Document, model, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
      name: string;
      email: string;
      password: string;
      avatar: string | null;
      createdAt: Date;
      updatedAt: Date;

      comparePassword: (val: string) => Promise<boolean>
};

const userSchema = new Schema<UserDocument>({
      name: { type: String, required: true },
      email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true
      },
      password: { type: String, required: true },
      avatar: { type: String, default: null }
}, {
      versionKey: false,
      timestamps: true,
      toJSON: {
            transform(doc, ret) {
                  if (ret) {
                        delete (ret as any).password
                  }
                  return ret
            }
      }
});


userSchema.pre("save", async function (next) {
      if (this.password && this.isModified("password")) {
            this.password = await hashValue(this.password)
      }
      next()
});

userSchema.methods.comparePassword = async function (val: string) {
      return await compareValue(val, this.password)
};

export const UserModel = model<UserDocument>("User", userSchema);