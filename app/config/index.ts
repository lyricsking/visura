import { z } from "zod";

export const pluginSchema = z.object({
  id:z.string(),
  name: z.string().readonly(),
  description: z.string().readonly(),
  version: z.number().readonly(),
  isEnabled: z.boolean().readonly(),
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
