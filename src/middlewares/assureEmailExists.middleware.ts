import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";
import { iUserRepository } from "../interfaces";

const assureEmailExistsMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const findUserEmail = await userRepository.findOneBy({
    email: request.body.email,
  });

  if (findUserEmail) throw new AppError("Email already exists", 409);

  next();
};

export default assureEmailExistsMiddlewares;
