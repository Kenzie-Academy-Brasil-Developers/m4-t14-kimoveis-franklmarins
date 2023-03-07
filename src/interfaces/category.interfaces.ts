import { Repository } from "typeorm";
import { z } from "zod";
import { Category } from "../entities";
import {
  createCategorySchema,
  returnArrayCategorySchema,
  returnCategoryByRealEstates,
  returnCategorySchema,
} from "../schemas/category.schema";

type iCategory = z.infer<typeof createCategorySchema>;
type iCategoryReturn = z.infer<typeof returnCategorySchema>;
type iCategoriesReturn = z.infer<typeof returnArrayCategorySchema>;
type iRealEstateByCategory = z.infer<typeof returnCategoryByRealEstates>;
type iCategoryRepository = Repository<Category>;

export {
  iCategory,
  iCategoryReturn,
  iCategoryRepository,
  iCategoriesReturn,
  iRealEstateByCategory,
};
