import * as z from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional(),
});

export { userSchema };
