import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

// this is server
// ok everyting


app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            message: "FlashChat Realtime Chat App Server"
      })
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));