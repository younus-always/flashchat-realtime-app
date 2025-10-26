"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
;
const loadEnvVariable = () => {
    const requireEnv = ["NODE_ENV", "PORT", "MONGO_URI", "FRONTEND_ORIGIN", "JWT_SECRET_TOKEN", "JWT_EXPIRES"];
    requireEnv.forEach(key => {
        if (!process.env[key])
            throw new Error(`Missing env variable: ${key}`);
    });
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        MONGO_URI: process.env.MONGO_URI,
        FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
        JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
        JWT_EXPIRERS: process.env.JWT_EXPIRES,
    };
};
exports.envVars = loadEnvVariable();
