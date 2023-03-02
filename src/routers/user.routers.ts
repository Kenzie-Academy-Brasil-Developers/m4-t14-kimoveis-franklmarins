import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";
import assureDataIsValidMiddleware from "../middlewares/assureDataIsValid.middleware";
import assureEmailExistsMiddlewares from "../middlewares/assureEmailExists.middleware";
import { createUserSchema } from "../schemas/user.schema";

const userRouters: Router = Router();

userRouters.post(
  "",
  assureDataIsValidMiddleware(createUserSchema),
  assureEmailExistsMiddlewares,
  createUserController
);

export default userRouters;
