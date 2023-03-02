import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";
import { iUserRepository, iUserReturn, iUserUpdate } from "../../interfaces";
import { returnUserSchema } from "../../schemas/user.schema";

const editUserService = async (
  newUserData: iUserUpdate,
  userId: number,
  tokenUserId: number,
  isAdmin: boolean
): Promise<iUserReturn> => {

  if (userId !== tokenUserId && isAdmin === false) {
    throw new AppError("Insufficient permission", 403)
  }

  const userRepository: iUserRepository = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: userId,
  });

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
    admin: oldUserData!.admin
  });

  await userRepository.save(user);

  const updatedUser = returnUserSchema.parse(user);

  return updatedUser;
};

export default editUserService;
