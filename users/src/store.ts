type User = {
  id: String,
  name: String
}

const users : User[] = [
  { id: '1', name: 'Noalia' },
  { id: '2', name: 'Leonara' },
  { id: '3', name: 'Bernard' },
  { id: '4', name: 'Hugo' },
];

function getAllUsers() : User[] {
  return users;
}

function getUser(id: String) : User {
  return users.find(user => user.id === id);
}

function createUser(name: String) : User {
  const user = {
    id: (Math.random() * 1000).toString(36).substr(4, 6),
    name,
  };
  users.push(user);
  return user;
}

export default {
  getAllUsers,
  getUser,
  createUser
};
