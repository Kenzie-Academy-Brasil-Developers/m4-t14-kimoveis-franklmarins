import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../error";
import { iRealEstateRepository } from "../../interfaces";

const listSchedulesService = async (realEstateId: number) => {
  // const scheduleRepository = AppDataSource.getRepository(Schedule);
  const realEstateRepository: iRealEstateRepository =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate = await realEstateRepository.findOneBy({
    id: realEstateId,
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  // const findSchedule = await scheduleRepository.findBy({ id: scheduleId });

  return;
};

export default listSchedulesService;
