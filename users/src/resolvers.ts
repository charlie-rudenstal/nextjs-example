import store from './store';

const resolvers = {
  Query: {
    users: () => store.getAllUsers(),
    user: (_, args) => store.getUser(args.id),
    me: () => null,
    playlists: (_, args) => store.getPlaylists(args.userId),
  },
  Mutation: {
    createUser: (_, args) => store.createUser(args.name),
  }
};

export default resolvers;