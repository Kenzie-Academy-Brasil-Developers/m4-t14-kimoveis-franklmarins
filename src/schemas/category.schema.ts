import { z } from "zod";
import { returnRealEstateSchemaArray } from "./realEstate.schema";

const createCategorySchema = z.object({
  name: z.string().max(45),
});

const returnCategorySchema = createCategorySchema.extend({
  id: z.number(),
});

const returnCategoryByRealEstates = createCategorySchema.extend({
  realEstate: returnRealEstateSchemaArray.array(),
});

const returnArrayCategorySchema = returnCategorySchema.array();

export {
  createCategorySchema,
  returnCategorySchema,
  returnArrayCategorySchema,
  returnCategoryByRealEstates,
};
