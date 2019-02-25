import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User]!
    user(id: ID!): User
    me: User
  }
  type User {
    id: String
    name: String
  }
  type Mutation {
    createUser(name: String): User
  }
`;

export default typeDefs;
