import { Request, Response } from "express";

import { iLogin } from "../interfaces";
import loginService from "../services/login/login.services";

const loginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: iLogin = request.body;

  const token = await loginService(loginData);

  return response.status(200).json({
    token: token,
  });
};
export { loginController };
