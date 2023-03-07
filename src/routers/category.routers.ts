import { Router } from "express";
import {
  createCategoryController,
  listCaregoryController,
  listRealEstateByCategoryIdController,
} from "../controllers/category.controllers";
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

categoryRouters.get("", listCaregoryController);
categoryRouters.get("/:id/realEstate", listRealEstateByCategoryIdController);

export default categoryRouters;
