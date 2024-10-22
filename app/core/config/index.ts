import { z } from "zod";

const STATUSES = ["active", "inactive"] as const;

export const pluginSchema = z.object({
  id:z.string(),
  name: z.string().readonly(),
  description: z.string().readonly(),
  version: z.number().readonly(),
  isActive: z.boolean().default(false)
});

export const configSchema = z.object({
  app: z.object({
    appName: z.string().readonly(),
    description: z.string().readonly(),
    homepage: z.string().readonly(),
    allowSignup: z.boolean(),
  }),
  plugins: z.array(pluginSchema),
});

export type Config = z.infer<typeof configSchema>;
