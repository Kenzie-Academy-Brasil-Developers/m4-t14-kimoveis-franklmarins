import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../error";
import { iRealEstateRepository } from "../../interfaces";

const listSchedulesService = async (realEstateId: number) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const realEstateRepository: iRealEstateRepository =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate = await realEstateRepository.findOneBy({
    id: realEstateId,
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const listByRealEstateId = await realEstateRepository
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.category", "category")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.schedule", "schedule")
    .leftJoinAndSelect("schedule.user", "user")
    .where("realEstate.id = :id", { id: realEstateId })
    .getOne();

  const newlistByRealEstateId = {
    ...listByRealEstateId,
    schedules: listByRealEstateId!.schedule,
  };
  delete newlistByRealEstateId.schedule;
  return listByRealEstateId;
};

export default listSchedulesService;
