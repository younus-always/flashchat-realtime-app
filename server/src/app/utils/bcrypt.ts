import bcrypt from "bcryptjs";

export const hashValue = async (password: string, salt: number = 10) => {
      return await bcrypt.hash(password, salt);
};
export const compareValue = async (plainPassword: string, hashedPassword: string) => {
      return await bcrypt.compare(plainPassword, hashedPassword);
};