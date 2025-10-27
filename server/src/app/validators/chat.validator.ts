import z from "zod";

export const createChatSchema = z.object({
      participantId: z.string().trim().min(1).optional(),
      isGroup: z.boolean().optional(),
      groupName: z.string().trim().min(1).optional(),
      participants: z.array(z.string()).optional()
});

export const chatIdSchema = z.object({
      id:z.string().trim().min(1)
});