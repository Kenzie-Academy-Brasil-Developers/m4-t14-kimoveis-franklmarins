import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";

import { User } from "../entities";
import {
  createUserSchema,
  returnArrayUsersSchema,
  returnUserSchema,
} from "../schemas/user.schema";

type iUser = z.infer<typeof createUserSchema>;
type iUserReturn = z.infer<typeof returnUserSchema>;
type iUsersReturn = z.infer<typeof returnArrayUsersSchema>;
type iUserRepository = Repository<User>;
type iUserUpdate = DeepPartial<iUser>;

export { iUser, iUserReturn, iUserRepository, iUsersReturn, iUserUpdate };
