import { Request, Response } from "express";
import { iCategory } from "../interfaces";
import createCategoryService from "../services/category/category.services";
import listCategoriesService from "../services/category/listCategories.services";

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

export { createCategoryController, listCaregoryController };
