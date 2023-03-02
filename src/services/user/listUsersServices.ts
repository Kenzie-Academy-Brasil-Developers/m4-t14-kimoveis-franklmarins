import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserRepository, iUsersReturn } from "../../interfaces";
import { returnArrayUsersSchema } from "../../schemas/user.schema";

const listUsersService = async (): Promise<iUsersReturn> => {
  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find();

  const users = returnArrayUsersSchema.parse(findUsers);

  return users;
};

export default listUsersService;
