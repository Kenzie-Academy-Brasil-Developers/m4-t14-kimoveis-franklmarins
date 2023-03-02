import { Request, Response } from "express";

import { iUser, iUserUpdate } from "../interfaces";
import createUserService from "../services/user/createUser.services";
import deleteUserService from "../services/user/deleteUser.services";
import listUsersService from "../services/user/listUsersServices";
import editUserService from "../services/user/updateUser.services";

const createUserController = async (request: Request, response: Response) => {
  const userData: iUser = request.body;

  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersService();

  return response.status(200).json(users);
};

const editUserController = async (request: Request, response: Response) => {
  const userData: iUserUpdate = request.body;
  const userId: number = Number(request.params.id);
  const tokenUserId: number = request.user.id
  const isAdmin: boolean = request.user.admin

  const userEdited = await editUserService(userData, userId, tokenUserId, isAdmin);

  return response.status(200).json(userEdited);
};

const deleteUserController = async (request: Request, response: Response) => {
  const userId: number = Number(request.params.id)

  await deleteUserService(userId)

  return response.status(204).send()
}

export { createUserController, listUsersController, editUserController, deleteUserController };
