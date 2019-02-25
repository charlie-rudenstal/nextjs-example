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
`;

export default typeDefs;
