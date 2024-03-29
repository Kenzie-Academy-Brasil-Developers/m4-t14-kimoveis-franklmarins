import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
});

const returnUserSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const updateUserSchema = z.object({
  name: z.string().max(45).optional(),
  email: z.string().email().max(45).optional(),
  admin: z.boolean().default(false).optional(),
  password: z.string().max(120).optional(),
});

const returnArrayUsersSchema = returnUserSchema.array();

export {
  createUserSchema,
  returnUserSchema,
  returnArrayUsersSchema,
  updateUserSchema,
};
