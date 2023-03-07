import { Request, Response } from "express";
import { iCategory, iCategoryReturn, iRealEstate } from "../interfaces";
import createCategoryService from "../services/category/category.services";
import createRealEstateService from "../services/realEstate/createRealEstate.services";

const createRealEstateController = async (
  request: Request,
  response: Response
) => {
  const realEstateData: iRealEstate = request.body;

  const newRealEstate = await createRealEstateService(realEstateData);

  return response.status(201).json(newRealEstate);
};

export { createRealEstateController };
