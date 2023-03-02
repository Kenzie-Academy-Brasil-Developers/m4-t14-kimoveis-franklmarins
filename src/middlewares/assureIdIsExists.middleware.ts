import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";
import { iUserRepository } from "../interfaces";

const assureIdExistsMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const findUserId = await userRepository.findOneBy({
    id: Number(request.params.id),
  });

  if (!findUserId) throw new AppError("User not found", 404);

  next();
};

export default assureIdExistsMiddlewares;