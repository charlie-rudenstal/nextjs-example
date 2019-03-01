// Users

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

// Playlists

type Playlist = {
  uri: String,
  title: String,
  userId: String
}

const playlists : Playlist[] = [
  { title: 'My first playlist', uri: 'spotify:playlist:xyz', userId: '1' },
  { title: 'My second playlist', uri: 'spotify:playlist:xyz2', userId: '1' },
  { title: 'My third playlist', uri: 'spotify:playlist:xyz3', userId: '1' },
  { title: 'My only playlist', uri: 'spotify:playlist:xyz4', userId: '2' },
];

function getPlaylists(userId: String) : Playlist[] {
  return playlists.filter(playlist => playlist.userId == userId);
}

export default {
  getAllUsers,
  getUser,
  createUser,
  getPlaylists
};
