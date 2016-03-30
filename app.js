var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

var users = require('./users.js');
var tweets = require('./tweets.js');
console.log(tweets.tweets());

var benj = {name: 'ben', age: 26};

app.get('/', function(req, res) {
  res.sendFile(index.html)
});

app.post('/getprofile', jsonParser, function(req, res) {
  res.json({message: users[req.body.id]});
});

app.listen(8080);
