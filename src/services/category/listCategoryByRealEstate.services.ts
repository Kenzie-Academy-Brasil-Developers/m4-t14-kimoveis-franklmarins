import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";
import { iCategoryRepository, iRealEstateByCategory } from "../../interfaces";

const listCategoryByRealEstate = async (
  categoryId: number
): Promise<{
  id: number;
  name: string;
  realEstate: {
    value: number | string;
    id: number;
    size: number;
    sold: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}> => {
  const categoryRepository: iCategoryRepository =
    AppDataSource.getRepository(Category);

  const findRealEstateByCategory = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!findRealEstateByCategory) {
    throw new AppError("Category not found", 404);
  }

  const categoryAndRealEstates = await categoryRepository
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.realEstate", "realEstate")
    .where("category.id = :categoryId", { categoryId })
    .getOne();

  const realEstates = categoryAndRealEstates?.realEstate.map((value) => {
    const newArr = {
      createdAt: value.createdAt,
      id: value.id,
      size: value.size,
      sold: value.sold,
      updatedAt: value.updatedAt,
      value: value.value,
    };
    return newArr;
  });

  const CategoryAndRealEstates: {
    id: number;
    name: string;
    realEstate: {
      value: number | string;
      id: number;
      size: number;
      sold: boolean;
      createdAt: string;
      updatedAt: string;
    }[];
  } = {
    id: categoryAndRealEstates!.id,
    name: categoryAndRealEstates!.name,
    realEstate: realEstates!,
  };

  return CategoryAndRealEstates;
};

export default listCategoryByRealEstate;
