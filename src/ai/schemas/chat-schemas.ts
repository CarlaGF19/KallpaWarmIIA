import { z } from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatInputSchema = z.object({
  model: z.string().default('KallpaWarmIA'),
  messages: z.array(ChatMessageSchema).max(30).refine(
    (msgs) => msgs.every((m) => m.content.length <= 4000),
    { message: 'Message content exceeds 4000 characters.' }
  ),
  temperature: z.number().min(0).max(1).optional().default(0.7),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  reply: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
