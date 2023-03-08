import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import {
  createScheduleSchema,
  returnScheduleSchema,
} from "../schemas/schedules.schemas";

type iSchedule = z.infer<typeof createScheduleSchema>;
type iScheduleReturn = z.infer<typeof returnScheduleSchema>;
type iSCheduleRepository = Repository<Schedule>;

export { iSchedule, iScheduleReturn, iSCheduleRepository };
