import store from './store';

const resolvers = {
  Query: {
    users: () => store.getAllUsers(),
    user: (_, args) => store.getUser(args.id),
    me: () => null,
  },
  Mutation: {
    createUser: (_, args) => store.createUser(args.name),
  }
};

export default resolvers;