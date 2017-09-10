const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Book {
        _id: ID!,
        title: String!,
        img: String!
    }

    type User {
        _id: ID!,
        email: String!,
        name: String!,
        city: String,
        state: String,
        books: [Book]
    }

    type Query {
        allBooks: [User!]!

        userById(email: String!): User!
    }

    type Mutation {
        addUser(name: String!, email: String!): User

        addBook(title: String!, img: String!): Book

        updateUser(email: String!, name: String!, city: String!, state: String!): String
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});