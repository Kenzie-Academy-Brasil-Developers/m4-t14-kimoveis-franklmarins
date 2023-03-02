import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const assureAdminIsTrueMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const isAdmin = request.user.admin;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default assureAdminIsTrueMiddleware;
