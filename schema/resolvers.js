var ObjectId = require('mongodb').ObjectID;

module.exports = {
    Query: {
        allBooks: async (root, data, {mongo: {Users}}) => {
            return await Users.find({}).toArray();
        },
        userById: async (root, data, {mongo: {Users}}) => {
            return await Users.findOne({email: data.email});
        }
    },

    Mutation: {
        addUser: async (root, data, {mongo: {Users}}) => {
            const newuser = {
                name: data.name,
                email: data.email,
                books: [],
                requestedBooks: [],
                pendingBooks: []
            };
            const response = await Users.insert(newuser);
            return Object.assign({_id: response.insertedIds[0]}, newuser);
        },
        updateUser: async (root, data, {mongo: {Users}}) => {
            const response = await Users.update(
                {
                    email: data.email
                },
                {
                    $set: {
                        name: data.name,
                        city: data.city,
                        state: data.state
                    }
                }
            );
            return response.result.electionId;
        },
        addBook: async (root, data, {mongo: {Users}}) => {
            const newBook = {
                _id: data._id,
                title: data.title,
                img: data.img,
                isRequested: data.isRequested
            }
            const response = await Users.update(
                {
                    email: data.email
                },
                {
                    $addToSet: {
                        books: newBook
                    }
                }
            );
            return response.result.electionId;
        }
    }
}