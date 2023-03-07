import { z } from "zod";
import { createAddressSchema, returnAddressSchema } from "./address.schema";
import { createCategorySchema, returnCategorySchema } from "./category.schema";

const createRealEstateSchema = z.object({
  value: z.any().transform((value) => Number(value)),
  size: z.number().gt(0).int(),
  address: createAddressSchema,
  categoryId: z.number(),
});

const returnRealEstateSchema = z.object({
  id: z.number(),
  value: z.number(),
  size: z.number().gt(0),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: returnAddressSchema,
  category: returnCategorySchema,
});

const returnRealEstateSchemaArray = returnRealEstateSchema.omit({
  category: true,
});

const returnArrayRealEstateSchema = returnRealEstateSchemaArray.array();

export {
  createRealEstateSchema,
  returnRealEstateSchema,
  returnArrayRealEstateSchema,
};
