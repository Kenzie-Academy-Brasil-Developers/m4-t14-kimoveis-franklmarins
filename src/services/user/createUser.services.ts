import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUser, iUserRepository, iUserReturn } from "../../interfaces";
import { returnUserSchema } from "../../schemas/user.schema";

const createUserService = async (userData: iUser): Promise<iUserReturn> => {
  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};

export default createUserService;
