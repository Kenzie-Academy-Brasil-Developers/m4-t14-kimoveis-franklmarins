import { Repository } from "typeorm";
import { z } from "zod";
import { RealEstate } from "../entities";
import {
  createRealEstateSchema,
  returnArrayRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate.schema";

type iRealEstate = z.infer<typeof createRealEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
type iRealEstatesReturn = z.infer<typeof returnArrayRealEstateSchema>;
type iRealEstateRepository = Repository<RealEstate>;

export {
  iRealEstate,
  iRealEstateReturn,
  iRealEstatesReturn,
  iRealEstateRepository,
};
