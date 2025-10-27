import { UserModel } from "../models/user.model"

export const findByUserService =async(userId:string)=>{
      return await UserModel.findById(userId);
};