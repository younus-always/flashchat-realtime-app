import { UserModel } from "../models/user.model";
import { NotFoundException, UnAuthorizedException } from "../utils/app-error";
import { compareValue } from "../utils/bcrypt";
import { LoginSchemaType, RegisterSchemaType } from "../validators/auth.validator";

export const registerService = async (payload: RegisterSchemaType) => {
      const { email } = payload;
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) throw new UnAuthorizedException("User Already Exist");
      const newUser = new UserModel({ ...payload });
      await newUser.save();
      return newUser;
};

export const loginService = async (payload: LoginSchemaType) => {
      const { email, password } = payload;

      const user = await UserModel.findOne({ email });
      if (!user) throw new NotFoundException("User Not Found");

      const isValidPassword = await compareValue(password, user.password);
      if(!isValidPassword) throw new UnAuthorizedException("Invalid email or password");

      return user;
};