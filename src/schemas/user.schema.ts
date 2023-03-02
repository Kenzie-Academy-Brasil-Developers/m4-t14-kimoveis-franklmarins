import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false).optional(),
  password: z
    .string()
    .max(120)
    .transform((password) => hashSync(password, 10)),
});

const returnUserSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .omit({ password: true });

const updateUserSchema = z.object({
  name: z.string().max(45).optional(),
  email: z.string().email().max(45).optional(),
  admin: z.boolean().default(false).optional(),
  password: z
    .string()
    .max(120)
    .transform((password) => hashSync(password, 10))
    .optional(),
});

const returnArrayUsersSchema = returnUserSchema.array();

export {
  createUserSchema,
  returnUserSchema,
  returnArrayUsersSchema,
  updateUserSchema,
};
