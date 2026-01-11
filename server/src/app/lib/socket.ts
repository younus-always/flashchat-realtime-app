import { Server as HTTPServer } from "http";
import { Server, type Socket } from 'socket.io';
import { envVars } from "../config/env.config";
import jwt from "jsonwebtoken";

interface AuthenticateSocket extends Socket {
      userId?: string
};

let io: Server | null = null;
const onlineUsers = new Map<string, string>();

export const initializeSocket = (httpServer: HTTPServer) => {
      io = new Server(httpServer, {
            cors: {
                  origin: envVars.FRONTEND_ORIGIN,
                  methods: ["GET", "POST"],
                  credentials: true
            }
      });

      io.use(async (socket: AuthenticateSocket, next) => {
            try {
                  const rawCookie = socket.handshake.headers.cookie;
                  if (!rawCookie) return next(new Error("Unauthorized"));

                  const token = rawCookie?.split("=")?.[1]?.trim();
                  if (!token) return next(new Error("Unauthorized"));

                  const decodedToken = jwt.verify(token, envVars.JWT_SECRET_TOKEN) as {
                        userId: string
                  };
                  if (!decodedToken) return next(new Error("Unauthorized"));

                  socket.userId = decodedToken.userId;
                  next();
            } catch (error) {
                  next(new Error("Internal Server Error"))
            }
      });

      io.on("connection", (socket: AuthenticateSocket) => {
            if (!socket.userId) {
                  socket.disconnect(true);
                  return
            }

            const userId = socket.userId;
            const newSocketId = socket.id;
            console.log(`Socket Connected`, { userId, newSocketId });

            // register socket for the user
            onlineUsers.set(userId, newSocketId)

            // Broadcast online user to all socket
            io?.emit("online:users", Array.from(onlineUsers.keys()));

            // create personal room for user
            socket.join(`user:${userId}`);

            // 
            socket.on("chat:join",
                  async (chatId: string, callback?: (err?: string) => void) => {
                        try {
                              socket.join(`chat:${chatId}`);
                              callback?.();
                        } catch (error) {
                              callback?.("Error joining chat");

                        }
                  })
      });
};