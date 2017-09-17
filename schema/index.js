const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Book {
        _id: ID!,
        title: String!,
        img: String!,
        isRequested: Boolean!,
        ownedBy: String!
    }

    type User {
        _id: ID!,
        email: String!,
        name: String!,
        city: String,
        state: String,
        books: [Book],
        requestedBooks: [Book],
        pendingBooks: [ID]
    }

    type BookPending {
        _id: ID!,
        requestedBy: String!
    }

    type Query {
        allBooks: [User!]!

        userById(email: String!): User!
    }

    type Mutation {
        addUser(name: String!, email: String!): User

        addBook(email: String!, _id: ID!, title: String!, img: String!, isRequested: Boolean!, ownedBy: String!): String

        removeBook(email: String!, _id: ID!): String

        updateRequestedBooks(email: String!, isAdding: Boolean!, _id: ID!, title: String!, img: String!, isRequested: Boolean!): String

        updatePendingBooks(email: String!, isAdding: Boolean!, _id: ID!, title: String!, img: String!, isRequested: Boolean!): String

        updateRequestStatus(_id: ID!, status: Boolean!, requestedBy: String!): Book

        updateUser(email: String!, name: String!, city: String!, state: String!): String
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});