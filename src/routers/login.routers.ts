import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
import assureDataIsValidMiddleware from "../middlewares/assureDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schema";

const loginRouter: Router = Router();

loginRouter.post("", assureDataIsValidMiddleware(loginSchema), loginController);

export default loginRouter;
