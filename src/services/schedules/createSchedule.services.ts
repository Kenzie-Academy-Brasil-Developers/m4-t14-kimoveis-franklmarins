import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../error";
import {
  iRealEstateRepository,
  iSchedule,
  iSCheduleRepository,
  iUserRepository,
} from "../../interfaces";

const createScheduleService = async (
  scheduleData: iSchedule,
  userId: number
) => {
  const scheduleRepository: iSCheduleRepository =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: iRealEstateRepository =
    AppDataSource.getRepository(RealEstate);
  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const findRealEstate: RealEstate | null =
    await realEstateRepository.findOneBy({
      id: scheduleData.realEstateId,
    });
  const findUser: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const date: Date = new Date(scheduleData.date);
  const weekDay: number = date.getDay();
  if (weekDay === 0 || weekDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const hour = new Date("1995-12-17" + "T" + scheduleData.hour + ":00");
  const findHour = hour.getHours();
  if (findHour < 8 || findHour >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const findDateUser = await scheduleRepository
    .createQueryBuilder()
    .where("schedule.userId = :id", { id: userId })
    .getOne();

  if (findDateUser?.date) {
    const dateUser: Date = new Date(findDateUser.date);
    const weekDayUser: number = dateUser.getDay();
    const hourUser = new Date("1995-12-17" + "T" + findDateUser.hour + ":00");
    const findHourUser = hourUser.getHours();
    if (weekDayUser === weekDay && findHourUser === findHour) {
      throw new AppError(
        "User schedule to this real estate at this date and time already exists",
        409
      );
    }
  }

  const findDateRealEstate = await scheduleRepository
    .createQueryBuilder()
    .where("schedule.realEstateId = :id", { id: scheduleData.realEstateId })
    .getOne();

  if (findDateRealEstate?.date) {
    const dateRealEstate: Date = new Date(findDateRealEstate.date);
    const weekDayRealEstate: number = dateRealEstate.getDay();
    const hourRealEstate = new Date(
      "1995-12-17" + "T" + findDateRealEstate.hour + ":00"
    );
    const findHourRealEstate = hourRealEstate.getHours();
    if (weekDayRealEstate === weekDay && findHourRealEstate === findHour) {
      throw new AppError(
        "Schedule to this real estate at this date and time already exists",
        409
      );
    }
  }

  await scheduleRepository
    .createQueryBuilder()
    .insert()
    .values([
      {
        ...scheduleData,
        realEstate: findRealEstate!,
        user: findUser!,
      },
    ])
    .execute();

  return;
};

export default createScheduleService;
