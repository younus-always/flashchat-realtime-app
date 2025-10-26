"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FlashChat Realtime Chat App Server"
    });
});
app.listen(env_1.envVars.PORT, () => console.log(`Server running on port: ${env_1.envVars.PORT}`));
