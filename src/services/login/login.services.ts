import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";
import { iLogin, iUserRepository } from "../../interfaces";

import "dotenv/config";

const loginService = async (loginData: iLogin): Promise<string> => {
  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordCompare = await compare(loginData.password, user.password);

  if (!passwordCompare) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};

export default loginService;
