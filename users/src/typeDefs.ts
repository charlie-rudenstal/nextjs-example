import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User]!
    user(id: ID!): User
    playlists(userId: ID!) : [Playlist]
    me: User
  }
  type User {
    id: String
    name: String
  }
  type Playlist {
    uri: ID!
    title: String
    userId: ID!
  }
  type Mutation {
    createUser(name: String): User
  }
`;

export default typeDefs;
