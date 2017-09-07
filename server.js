var http = require('http');
var path = require('path');
var express = require('express');
var myMongo = require('./myMongo');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'views/dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/dist/index.html'));
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0",  () => {
    var addr = server.address();
    console.log("Server listening at port", addr.address + ":" + addr.port);
})