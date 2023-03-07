import { Request, Response } from "express";
import { iRealEstate } from "../interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.services";
import listRealEstateService from "../services/realEstate/listRealEstate.services";

const createRealEstateController = async (
  request: Request,
  response: Response
) => {
  const realEstateData: iRealEstate = request.body;

  const newRealEstate = await createRealEstateService(realEstateData);

  return response.status(201).json(newRealEstate);
};

const listRealEstateController = async (
  request: Request,
  response: Response
) => {
  const realEstates = await listRealEstateService();

  return response.status(200).json(realEstates);
};

export { createRealEstateController, listRealEstateController };
