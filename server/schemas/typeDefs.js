const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input InputBook {
    authors: [String]
    description: String
    bookId: String
    image: String
    forSale: String
    link: String
    title: String
  }
  type Query {
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: InputBook): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
