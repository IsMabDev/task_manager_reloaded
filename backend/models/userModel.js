const prisma = require('./prismaClient')

const getAllUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}

const getUserbyId = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  return user 
}

const getUserbyEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  return user
}

const createUser = async (name, email, password) => {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password
    }
  })
  return user
}

const updateUser = async (id, name, email, password) => {
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      name: name,
      email: email,
      password: password
    }
  })
  return user
}

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id: id
    }
  })
  return user
} 

const createFakeUsers = async () => {
  const users = await prisma.user.createMany({
    data: [
      { id: 1,
        name: 'qsdf',
        email: 'qsdf@gmail.com',
        password: 'qsdf'
      },
      {
        id: 2,
        name: 'qsdf2',
        name: 'qsdf2',
        email: 'qsdf2@gmail.com',
        password: 'qsdf'
      },
      {
        id: 3,
        name: 'qsdf3',
        name: 'qsdf',
        email: 'qsdf3@gmail.com',
        password: 'qsdf'
      },
    ]
  })


  return users
} 
// createFakeUsers()
module.exports = {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
  createFakeUsers,
  getUserbyEmail
}