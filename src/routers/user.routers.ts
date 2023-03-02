import { Router } from "express";
import {
  createUserController,
  listUsersController,
} from "../controllers/user.controllers";
import assureAdminIsTrueMiddleware from "../middlewares/assureAdminIsTrue.middleware";
import assureDataIsValidMiddleware from "../middlewares/assureDataIsValid.middleware";
import assureEmailExistsMiddlewares from "../middlewares/assureEmailExists.middleware";
import assureTokeIsValidMiddleware from "../middlewares/assureTokeIsValid.middleware";
import { createUserSchema } from "../schemas/user.schema";

const userRouters: Router = Router();

userRouters.post(
  "",
  assureDataIsValidMiddleware(createUserSchema),
  assureEmailExistsMiddlewares,
  createUserController
);

userRouters.get(
  "",
  assureTokeIsValidMiddleware,
  assureAdminIsTrueMiddleware,
  listUsersController
);

export default userRouters;
