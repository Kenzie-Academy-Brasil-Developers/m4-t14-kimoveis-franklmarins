import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategoriesReturn, iCategoryRepository } from "../../interfaces";
import { returnArrayCategorySchema } from "../../schemas/category.schema";

const listCategoriesService = async (): Promise<iCategoriesReturn> => {
  const categoryRepository: iCategoryRepository =
    AppDataSource.getRepository(Category);

  const findCategories: Array<Category> = await categoryRepository.find();

  const categories = returnArrayCategorySchema.parse(findCategories);

  return categories;
};

export default listCategoriesService;
