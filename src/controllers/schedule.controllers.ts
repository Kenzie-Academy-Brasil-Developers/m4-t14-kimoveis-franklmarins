import { Request, Response } from "express";
import { iSchedule } from "../interfaces";
import createScheduleService from "../services/schedules/createSchedule.services";
import listSchedulesService from "../services/schedules/listSchedules.services";

const createScheduleController = async (
  request: Request,
  response: Response
) => {
  const scheduleData: iSchedule = request.body;
  const userId: number = request.user.id;

  const newSchedule = await createScheduleService(scheduleData, userId);

  return response.status(201).json({ message: "Schedule created" });
};

const listSchedulesController = async (
  request: Request,
  response: Response
) => {
  const scheduleId: number = Number(request.params.id);

  const schedules = await listSchedulesService(scheduleId);

  return response.status(200).json(schedules);
};

export { createScheduleController, listSchedulesController };
