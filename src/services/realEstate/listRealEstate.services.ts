import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iRealEstateRepository, iRealEstatesReturn } from "../../interfaces";
import { returnArrayRealEstateSchema } from "../../schemas/realEstate.schema";

const listRealEstateService = async (): Promise<iRealEstatesReturn> => {
  const realEstateRepository: iRealEstateRepository =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: Array<RealEstate> = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  const realEstate = returnArrayRealEstateSchema.parse(findRealEstate);

  return realEstate;
};

export default listRealEstateService;
