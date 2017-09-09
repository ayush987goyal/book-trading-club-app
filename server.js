var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
const {
    graphqlExpress,
    graphiqlExpress
} = require('apollo-server-express');

const schema = require('./schema');
const connectMongo = require('./myMongo');

const start = async() => {

    var app = express();
    var server = http.createServer(app);

    app.use(bodyParser.json());
    // app.use(express.static(path.resolve(__dirname, 'views/dist')));

    const mongo = await connectMongo();
    app.use('/graphql', bodyParser.json(), graphqlExpress({
        context: {
            mongo
        },
        schema
    }));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));

    // app.get('/*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'views/dist/index.html'));
    // })

    server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
        var addr = server.address();
        console.log("Server listening at port", addr.address + ":" + addr.port);
    })
};

start();