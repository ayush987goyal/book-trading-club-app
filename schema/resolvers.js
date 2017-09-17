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
                isRequested: data.isRequested,
                ownedBy: data.ownedBy
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
        },
        removeBook: async (root, data, {mongo: {Users}}) => {
            const response = await Users.update(
                {
                    email: data.email
                },
                {
                    $pull: {
                        books: {
                            _id: data._id
                        }
                    }
                }
            );
        },
        updateRequestedBooks: async (root, data, {mongo: {Users}}) => {
            const newBook = {
                _id: data._id,
                title: data.title,
                img: data.img,
                isRequested: data.isRequested
            }
            let response;
            if(data.isAdding) {
                response = await Users.update(
                    {
                        email: data.email
                    },
                    {
                        $addToSet: {
                            requestedBooks: newBook
                        }
                    }
                );
            }
            else {
                response = await Users.update(
                    {
                        email: data.email
                    },
                    {
                        $pull: {
                            requestedBooks: {
                                _id: data._id
                            }
                        }
                    }
                );
            }
            return response.result.electionId;
        },
        updatePendingBooks: async (root, data, {mongo: {Users}}) => {
            const newBook = {
                _id: data._id,
                title: data.title,
                img: data.img,
                isRequested: data.isRequested
            }
            let response;
            if(data.isAdding) {
                response = await Users.update(
                    {
                        email: data.email
                    },
                    {
                        $addToSet: {
                            pendingBooks: newBook
                        }
                    }
                );
            }
            else {
                response = await Users.update(
                    {
                        email: data.email
                    },
                    {
                        $pull: {
                            pendingBooks: {
                                _id: data._id
                            }
                        }
                    }
                );
            }
            return response.result.electionId;
        },
        updateRequestStatus: async (root, data, {mongo: {Users}}) => {
            const response = await Users.update(
                {
                    "books._id": data._id 
                },
                {
                    $set: {
                        "books.$.isRequested": data.status
                    },
                    $addToSet: {
                        pendingBooks: data._id
                    }
                }
            );
            const newRes = await Users.find(
                {"books._id": data._id},
                {_id: 0, books: {$elemMatch: {_id: data._id}} }
            ).toArray();

            const otherResponse = await Users.update(
                {
                    email: data.requestedBy
                },
                {
                    $addToSet: {
                        requestedBooks: newRes[0].books[0]
                    }
                }
            );
            return newRes[0].books[0];
        }
    }
}