import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import debug from 'debug';
const log = debug('users');

const server = new ApolloServer({ typeDefs, resolvers, cors: true, debug: true });
server.listen(8002).then(options => {
  log(`Server listening at ${options.url}`);
});
