import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const assureDataIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const validatedData = schema.parse(request.body);

    request.body = validatedData;

    return next();
  };

export default assureDataIsValidMiddleware;
