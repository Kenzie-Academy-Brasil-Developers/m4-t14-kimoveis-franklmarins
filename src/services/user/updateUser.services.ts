import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserRepository, iUserReturn, iUserUpdate } from "../../interfaces";
import { returnUserSchema } from "../../schemas/user.schema";

const editUserService = async (
  newUserData: iUserUpdate,
  userId: number
): Promise<iUserReturn> => {
  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: userId,
  });

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser = returnUserSchema.parse(user);

  return updatedUser;
};

export default editUserService;
