module.exports = {
    Query: {
        allBooks: async (root, data, {mongo: {Users}}) => {
            return await Users.find({}).toArray();
        }
    },

    Mutation: {
        addUser: async (root, data, {mongo: {Users}}) => {
            const newuser = {
                name: data.name,
                email: data.email,
                books: []
            };
            const response = await Users.insert(newuser);
            return Object.assign({_id: response.insertedIds[0]}, newuser);
        }
    }
}