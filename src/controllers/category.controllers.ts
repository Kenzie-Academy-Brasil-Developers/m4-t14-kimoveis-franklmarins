import { Request, Response } from "express";
import { iCategory } from "../interfaces";
import createCategoryService from "../services/category/createCategory.services";
import listCategoriesService from "../services/category/listCategories.services";
import listCategoryByRealEstate from "../services/category/listCategoryByRealEstate.services";

const createCategoryController = async (
  request: Request,
  response: Response
) => {
  const categoryData: iCategory = request.body;

  const newCategory = await createCategoryService(categoryData);

  return response.status(201).json(newCategory);
};

const listCaregoryController = async (request: Request, response: Response) => {
  const categories = await listCategoriesService();

  return response.status(200).json(categories);
};

const listRealEstateByCategoryIdController = async (
  request: Request,
  response: Response
) => {
  const categoryId: number = Number(request.params.id);

  const RealEstateByCategory = await listCategoryByRealEstate(categoryId);

  return response.status(200).json(RealEstateByCategory);
};

export {
  createCategoryController,
  listCaregoryController,
  listRealEstateByCategoryIdController,
};
