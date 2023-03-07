import { Router } from "express";
import { createRealEstateController } from "../controllers/realEstate.controllers";
import assureAdminIsTrueMiddleware from "../middlewares/assureAdminIsTrue.middleware";
import assureDataIsValidMiddleware from "../middlewares/assureDataIsValid.middleware";
import assureTokeIsValidMiddleware from "../middlewares/assureTokeIsValid.middleware";
import { createCategorySchema } from "../schemas/category.schema";
import { createRealEstateSchema } from "../schemas/realEstate.schema";

const realEstateRouters: Router = Router();

realEstateRouters.post(
  "",
  assureDataIsValidMiddleware(createRealEstateSchema),
  assureTokeIsValidMiddleware,
  assureAdminIsTrueMiddleware,
  createRealEstateController
);

export default realEstateRouters;
