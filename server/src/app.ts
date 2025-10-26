import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());


// Main Route
app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            message: "Welcome to FlashChat Realtime Chat App Server"
      })
});


export default app;