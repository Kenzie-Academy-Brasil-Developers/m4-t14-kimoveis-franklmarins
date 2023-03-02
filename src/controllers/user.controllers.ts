import { Request, Response } from "express";

import { iUser, iUserUpdate } from "../interfaces";
import createUserService from "../services/user/createUser.services";
import listUsersService from "../services/user/listUsersServices";
import editUserService from "../services/user/updateUser.services";

const createUserController = async (request: Request, response: Response) => {
  const userData: iUser = request.body;

  const newUser = await createUserService(userData);

  return response.status(200).json(newUser);
};

const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersService();

  return response.status(200).json(users);
};

const editUserController = async (request: Request, response: Response) => {
  const userData: iUserUpdate = request.body;
  const userId: number = Number(request.params.id);

  const userEdited = await editUserService(userData, userId);

  return response.status(200).json(userEdited);
};

export { createUserController, listUsersController, editUserController };
