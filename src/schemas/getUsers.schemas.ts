import * as z from "zod";

const showUsersSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  admin: z.boolean(),
  active: z.boolean(),
});

export { showUsersSchema };
