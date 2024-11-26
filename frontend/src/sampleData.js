

const roles = [
  {
    _id: "674493a041ca594eb8949509",
    title: "Administrator",
    permissions: { read: true, write: true },
    otherPermissions: [],
    __v: 0,
  },
];

const users = [
  {
    _id: "67449f295d3df325263591ae",
    name: "Ravi Jaiswal",
    email: "ravi@gmail.com",
    username: "ravi@gmail.com",
    password: "1234",
    roleId: "674493a041ca594eb8949509",
    isActive: true,
    __v: 0,
  }, 
  {
    _id: "67449f295d3df325263591de",
    name: "Kuanl Deshmukh",
    email: "kd@gmail.com",
    username: "kd@gmail.com",
    password: "1234",
    roleId: "674493a041ca594eb8949509",
    isActive: false,
    __v: 0,
  }, 
  {
    _id: "67449f295d3df325263591ge",
    name: "Ravi Jaiswal",
    email: "ravi@gmail.com",
    username: "ravi@gmail.com",
    password: "1234",
    roleId: "674493a041ca594eb8949509",
    isActive: true,
    __v: 0,
  }, 
  {
    _id: "67449f295d3df3252635915e",
    name: "Ravi Jaiswal",
    email: "ravi@gmail.com",
    username: "ravi@gmail.com",
    password: "1234",
    roleId: "674493a041ca594eb8949509",
    isActive: true,
    __v: 0,
  }, 
  {
    _id: "67449f295d3df325263591ae",
    name: "Ravi Jaiswal",
    email: "ravi@gmail.com",
    username: "ravi@gmail.com",
    password: "1234",
    roleId: "674493a041ca594eb8949509",
    isActive: true,
    __v: 0,
  }, 
];


const getRoleById = (id) => {
  return roles.map((role) => {
    if (role._id === id) {
      return role;
    }
  });
};


const getUserById = (id) => {
  return users.map((user) => {
    if (user._id === id) {
      return user;
    }
  });
};

module.exports = {roles, users, getRoleById, getUserById }