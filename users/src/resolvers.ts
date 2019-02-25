import store from './store';

const resolvers = {
  Query: {
    users: () => store.getAllUsers(),
    user: (_, args) => store.getUser(args.id),
    me: () => null,
  }
};

export default resolvers;