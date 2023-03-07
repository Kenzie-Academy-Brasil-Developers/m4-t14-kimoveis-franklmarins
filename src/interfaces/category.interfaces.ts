import { Repository } from "typeorm";
import { z } from "zod";
import { Category } from "../entities";
import {
  createCategorySchema,
  returnCategorySchema,
} from "../schemas/category.schema";

type iCategory = z.infer<typeof createCategorySchema>;
type iCategoryReturn = z.infer<typeof returnCategorySchema>;
type iCategoryRepository = Repository<Category>;

export { iCategory, iCategoryReturn, iCategoryRepository };
