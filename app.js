var express = require('express');
var app = express();

app.use(express.static('./public'));

var users = require('./users.js');

var benj = {name: 'ben', age: 26};

app.get('/', function(req, res) {
  res.sendFile(index.html)
})

app.get('/viet', function(req, res) {
  res.send(users.viet);
});

app.listen(8090);
