import dotenv from "dotenv";
dotenv.config();

interface IEnvConfig {
      PORT: string;
      NODE_ENV: "development" | "production";
      MONGO_URI: string;
      FRONTEND_ORIGIN: string;
      JWT_SECRET_TOKEN: string;
      JWT_EXPIRERS: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
};

const loadEnvVariable = (): IEnvConfig => {
      const requireEnv: string[] = ["NODE_ENV", "PORT", "MONGO_URI", "FRONTEND_ORIGIN", "JWT_SECRET_TOKEN", "JWT_EXPIRES", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];

      requireEnv.forEach(key => {
            if (!process.env[key]) throw new Error(`Missing env variable: ${key}`)
      });

      return {
            NODE_ENV: process.env.NODE_ENV as "development" | "production",
            PORT: process.env.PORT as string,
            MONGO_URI: process.env.MONGO_URI as string,
            FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN as string,
            JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN as string,
            JWT_EXPIRERS: process.env.JWT_EXPIRES as string,
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
      }

};

export const envVars = loadEnvVariable();