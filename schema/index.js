const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Book {
        _id: ID!,
        title: String!,
        img: String!,
        isRequested: Boolean!
    }

    type User {
        _id: ID!,
        email: String!,
        name: String!,
        city: String,
        state: String,
        books: [Book],
        requestedBooks: [Book],
        pendingBooks: [Book]
    }

    type Query {
        allBooks: [User!]!

        userById(email: String!): User!
    }

    type Mutation {
        addUser(name: String!, email: String!): User

        addBook(email: String!, _id: ID!, title: String!, img: String!, isRequested: Boolean!): String

        updateUser(email: String!, name: String!, city: String!, state: String!): String
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});