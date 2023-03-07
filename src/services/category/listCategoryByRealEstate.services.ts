import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";
import { iCategoryRepository, iRealEstateByCategory } from "../../interfaces";
import { returnCategoryByRealEstates } from "../../schemas/category.schema";

const listCategoryByRealEstate = async (
  categoryId: number
): Promise<iRealEstateByCategory> => {
  const categoryRepository: iCategoryRepository =
    AppDataSource.getRepository(Category);

  const findRealEstateByCategory = await categoryRepository.find({
    where: { id: categoryId },
    relations: {
      realEstate: true,
    },
  });

  // const postsTags = await AppDataSource.createQueryBuilder(Post, 'posts').
  //   innerJoinAndSelect('posts.tags', 'tags_posts').
  //   innerJoinAndSelect('tags_posts.tag', 'tags').
  //   where('posts.id = :postId', {postId}).
  //   getOne()

  if (findRealEstateByCategory.length === 0) {
    throw new AppError("Category not found", 404);
  }
  console.log({
    name: findRealEstateByCategory[0].name,
    realEstate: findRealEstateByCategory[0].realEstate,
  });
  const RealEstatesByCategory = returnCategoryByRealEstates.parse({
    name: findRealEstateByCategory[0].name,
    realEstate: findRealEstateByCategory[0].realEstate,
  });

  return RealEstatesByCategory;
};

export default listCategoryByRealEstate;
