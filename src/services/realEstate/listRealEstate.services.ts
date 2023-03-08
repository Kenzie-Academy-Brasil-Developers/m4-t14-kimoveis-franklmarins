import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iRealEstateRepository, iRealEstatesReturn } from "../../interfaces";

const listRealEstateService = async (): Promise<iRealEstatesReturn> => {
  const realEstateRepository: iRealEstateRepository =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: Array<RealEstate> = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  const newRealEstate = findRealEstate.map((value) => {
    const newArr = {
      sold: value.sold,
      id: value.id,
      value: Number(value.value),
      size: value.size,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      address: {
        id: value.address!.id,
        street: value.address!.street,
        zipCode: value.address!.zipCode,
        number: value.address!.number,
        city: value.address!.city,
        state: value.address!.state,
      },
    };
    return newArr;
  });

  return newRealEstate;
};

export default listRealEstateService;
