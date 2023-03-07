import { Router } from "express";
import { createCategoryController } from "../controllers/category.controllers";
import assureAdminIsTrueMiddleware from "../middlewares/assureAdminIsTrue.middleware";
import assureDataIsValidMiddleware from "../middlewares/assureDataIsValid.middleware";
import assureTokeIsValidMiddleware from "../middlewares/assureTokeIsValid.middleware";
import { createCategorySchema } from "../schemas/category.schema";

const categoryRouters: Router = Router();

categoryRouters.post(
  "",
  assureDataIsValidMiddleware(createCategorySchema),
  assureTokeIsValidMiddleware,
  assureAdminIsTrueMiddleware,
  createCategoryController
);

export default categoryRouters;
