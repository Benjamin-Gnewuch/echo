var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

var users = require('./users.js');

var benj = {name: 'ben', age: 26};

app.get('/', function(req, res) {
  res.sendFile(index.html)
});

app.get('/user/:id', function(req, res) {
  var id = (req.params.id);
  console.log(req.params.id);
  res.send(users[id]);
});

app.post('/getprofile', jsonParser, function(req, res) {
  console.log(req.body);
  console.log(req.body.id);
  res.json({message: users[req.body.id]});
});

app.listen(8080);
