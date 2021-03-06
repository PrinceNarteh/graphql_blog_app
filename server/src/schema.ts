import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    me: User
    posts(take: Int!, skip: Int!): [Post!]!
    post(id: ID!): PostPayload!
    profile(userId: ID!): Profile
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    togglePublishPost(postId: ID!): PostPayload!
    signUp(
      credentials: CredentialsInput!
      name: String!
      bio: String!
    ): AuthPayload!
    signIn(credentials: CredentialsInput!): AuthPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts(take: Int!, skip: Int!): [Post!]!
  }

  type Profile {
    id: ID!
    bio: String!
    isMyProfile: Boolean!
    user: User!
  }

  type UserError {
    message: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  input PostInput {
    title: String
    content: String
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`;
