const prisma = require("./prismaClient");
const asyncHandler = require("express-async-handler");

const categoryModel = {
  getAllCategories: asyncHandler(async (userId) => {
    const categories = await prisma.category.findMany({where: {userId: userId}});
    return categories;
  }),
  createCategory: asyncHandler(async (userId, title) => {
    const category = await prisma.category.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        title,
      },
    });
    return category;
  }),
  updateCategory: asyncHandler(async (userId,id, title) => {
    const category = await prisma.category.update({
      where: {
        userId,
        id,
      },
      data: {
        title,
      },
    });
    return category;
  }),
  getCategoryById: asyncHandler(async (id) => {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  }),
  deleteCategory: asyncHandler(async (userId,id) => {
    const category = await prisma.category.delete({
      where: {
        userId,
        id,
      },
    });
    return category;
  }), 

  ensureDefaultCategoryForUser: asyncHandler(async(userId)=> {
  const defaultCategory = await prisma.category.findFirst({
    where: { userId, isDefault: true },
  });

  if (!defaultCategory) {
    await prisma.category.create({
      data: {
        title: 'Uncategorized',
        isDefault: true,
        userId,
      },
    });
    console.log(`Default category created for user ${userId}.`);
  }
}),
createFakeCategories: asyncHandler(async () => {
  await prisma.category.createMany({
    data: [
      { title: 'Uncategorized', userId:3, isDefault: true }, 
      { title: 'cat1',color: 'red', userId:3, isDefault: false },
      { title: 'cat2',color: 'blue', userId:3, isDefault: false },
      { title: 'cat3',color: 'green', userId:3, isDefault: false },
      { title: 'cat4',color: 'yellow',userId:3,  isDefault: false }, 
          ],
  });
  console.log('Fake categories created.');

}
)  

}
// categoryModel.createFakeCategories()




module.exports = categoryModel