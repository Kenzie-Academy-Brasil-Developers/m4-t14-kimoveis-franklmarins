import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";
import {
  iCategory,
  iCategoryRepository,
  iCategoryReturn,
} from "../../interfaces";

const createCategoryService = async (
  categoryData: iCategory
): Promise<iCategoryReturn> => {
  const categoryRepository: iCategoryRepository =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOneBy({
    name: categoryData.name,
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  return category;
};

export default createCategoryService;
