import { Request, Response } from "express";
import { iCategory } from "../interfaces";
import createCategoryService from "../services/category/category.services";

const createCategoryController = async (
  request: Request,
  response: Response
) => {
  const categoryData: iCategory = request.body;

  const newCategory = await createCategoryService(categoryData);

  return response.status(201).json(newCategory);
};

export { createCategoryController };
