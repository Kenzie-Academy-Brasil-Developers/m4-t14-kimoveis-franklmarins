import { Router } from "express";
import {
  createScheduleController,
  listSchedulesController,
} from "../controllers/schedule.controllers";
import assureAdminIsTrueMiddleware from "../middlewares/assureAdminIsTrue.middleware";
import assureDataIsValidMiddleware from "../middlewares/assureDataIsValid.middleware";
import assureTokeIsValidMiddleware from "../middlewares/assureTokeIsValid.middleware";
import { createScheduleSchema } from "../schemas/schedules.schemas";

const schedulesRouters: Router = Router();

schedulesRouters.post(
  "",
  assureTokeIsValidMiddleware,
  assureDataIsValidMiddleware(createScheduleSchema),
  createScheduleController
);

schedulesRouters.get("/realEstate/:id", listSchedulesController);

export default schedulesRouters;
