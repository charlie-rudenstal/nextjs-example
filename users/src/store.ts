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

export default {
  getAllUsers,
  getUser
};
