import { Router } from "express";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controllers";
import assureAdminIsTrueMiddleware from "../middlewares/assureAdminIsTrue.middleware";
import assureDataIsValidMiddleware from "../middlewares/assureDataIsValid.middleware";
import assureTokeIsValidMiddleware from "../middlewares/assureTokeIsValid.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schema";

const realEstateRouters: Router = Router();

realEstateRouters.post(
  "",
  assureDataIsValidMiddleware(createRealEstateSchema),
  assureTokeIsValidMiddleware,
  assureAdminIsTrueMiddleware,
  createRealEstateController
);

realEstateRouters.get("", listRealEstateController);

export default realEstateRouters;
