const { parse } = require("dotenv");
const prisma = require("./prismaClient");
const asyncHandler = require("express-async-handler");


const taskModel = {
  getAllTasks: async (userId) => {
    const tasks = await prisma.task.findMany({ where: { userId } });

    return tasks;
  },
  createTask: async (title, description, userId, categoryId) => {

    const Uncategorized = await prisma.category.findFirst({
      where: {
        userId:parseInt(userId),
        title: 'Uncategorized',
      },
    })

        console.log("parseInt(UncategorizedId): ", parseInt(Uncategorized.id));
        console.log("parseInt(categoryId): ", parseInt(categoryId));


    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        category: {
          connect: {
            id: (categoryId!==undefined)? parseInt(categoryId)
              : parseInt(Uncategorized.id),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return newTask;
  },
  updateTask: async (userId,id, title, description, status, dueDate) => {
    const updatedTask = await prisma.task.update({
      where: {
        userId: userId,
        id: parseInt(id)
      },
      data: {
        title: title,
        description: description,
        status: status,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    return updatedTask;
  },

  deleteTask: async (id) => {
    const Task = await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    return Task;
  },

  getTaskById: async (id) => {
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return task;
  },

  getTasksByCategory: async (userId, id) => {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        category: {
          id: parseInt(id),
        },
      },
    }); 
    return tasks;
  },
  createFakeTasks: async (userId,categoryId) => {
    const tasks = await prisma.task.createMany({
      data: [
        {
          title: 'Task 1',
          description: 'Description 1',
          userId: userId,
          categoryId: categoryId,
        },
        {
          title: 'Task 2',
          description: 'Description 2',
          userId: userId,
          categoryId: categoryId,
        },
        {
          title: 'Task 3',
          description: 'Description 3',
          userId: userId,
          categoryId: categoryId,
        },
      ],
      }    
    ); 
  return tasks;
  },
};
taskModel.createFakeTasks(3,3)

module.exports = taskModel;