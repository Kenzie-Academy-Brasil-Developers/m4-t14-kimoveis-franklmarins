import {
  createUserSchema,
  returnArrayUsersSchema,
  returnUserSchema,
} from "../schemas/user.schema";
import { z } from "zod";
import { Repository } from "typeorm";
import { User } from "../entities";

type iUser = z.infer<typeof createUserSchema>;
type iUserReturn = z.infer<typeof returnUserSchema>;
type iUsersReturn = z.infer<typeof returnArrayUsersSchema>;
type iUserRepository = Repository<User>;

export { iUser, iUserReturn, iUserRepository, iUsersReturn };
