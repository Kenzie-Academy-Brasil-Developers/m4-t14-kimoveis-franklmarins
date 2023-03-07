import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../error";
import {
  iCategoryRepository,
  iRealEstate,
  iRealEstateRepository,
} from "../../interfaces";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

const createRealEstateService = async (realEstateData: iRealEstate) => {
  const realEstateRepository: iRealEstateRepository =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: iCategoryRepository =
    AppDataSource.getRepository(Category);

  const findAddress: Address | null = await addressRepository.findOne({
    where: {
      street: realEstateData.address.street,
      zipCode: realEstateData.address.zipCode,
    },
  });

  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }

  const newAddress: Address = addressRepository.create(realEstateData.address);

  await addressRepository.save(newAddress);

  const findCategory: Category | null = await categoryRepository.findOneBy({
    id: realEstateData.categoryId,
  });

  const realEstate: RealEstate = realEstateRepository.create({
    ...realEstateData,
    address: newAddress,
    category: findCategory,
  });

  await realEstateRepository.save(realEstate);

  const newRealEstate = returnRealEstateSchema.parse(realEstate);

  return newRealEstate;
};

export default createRealEstateService;
