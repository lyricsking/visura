import { z } from "zod";

export const pluginSchema = z.object({
  name: z.string().readonly(),
  description: z.string().readonly(),
  enabled: z.boolean().readonly(),
  version: z.number().readonly(),
});

export const configSchema = z.object({
  app: z.object({
    appName: z.string().readonly(),
    description: z.string().readonly(),
    homepage: z.string().readonly(),
    enableSignup: z.boolean(),
  }),
  plugins: z.array(pluginSchema),
});

export type Config = z.infer<typeof configSchema>;
