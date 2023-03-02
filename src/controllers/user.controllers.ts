import { Request, Response } from "express";
import { iUser } from "../interfaces";
import createUserService from "../services/user/createUser.services";
import listUsersService from "../services/user/listUsersServices";

const createUserController = async (request: Request, response: Response) => {
  const userData: iUser = request.body;

  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersService();

  return response.status(200).json(users);
};

export { createUserController, listUsersController };
