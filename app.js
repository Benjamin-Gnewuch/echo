var express = require('express');
var app = express();

var tweetCollection = require('./tweets.js');
var userCollection = require('./users.js');

tweetCollection.generateTweets(100);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static('./public'));

app.get('/arrive', function(req, res) {
  var user;
  if(req.cookies.loggedin === 'true') {
    user = userCollection.user(req.cookies.username);
    res.json({message: user});
  }
  else {
    res.sendStatus(404);
  }
});

app.post('/search', jsonParser, function(req, res) {
  var response = userCollection.user(req.body.search);

  if(response == 404) {
    res.sendStatus(404);
  }
  else {
    res.json({message: response});
  }
});

app.get('/tweets', function(req, res) {
  res.json(tweetCollection.tweets());
});

app.get('/users', function(req, res) {
  res.json(userCollection.users());
});

app.post('/gettweet', jsonParser, function(req, res) {
  res.json({message: tweetCollection.tweet(req.body.id)});
});

app.post('/getprofile', jsonParser, function(req, res) {
  var users = userCollection.users();
  for(var i = 0; i < users.length; i++) {
    if(req.body.handle == users[i].handle) {
      res.json({message: users[i]});
    }
  }
});

app.post('/pushuser', jsonParser, function(req, res) {
  res.send(userCollection.change(req.body));
});

app.post('/updatefavorite', jsonParser, function(req, res) {
  var tweets;
  if(req.body.direction == 'increase') {
    tweets = tweetCollection.incrementFavorite(req.body.id);
  }
  else {
    tweets = tweetCollection.decrementFavorite(req.body.id);
  }

  res.json({message: tweets});
})

app.post('/pushtweet', jsonParser, function(req, res) {
  res.send(tweetCollection.addTweet(req.body));
});

app.post('/authorize', jsonParser, function(req, res) {
  var response = userCollection.authorize(req.body);
  if(response == 401) {
    res.sendStatus(401);
  }
  else if(response == 404) {
    res.sendStatus(404);
  }
  else {
    res.cookie('loggedin', 'true');
    res.cookie('username', response.handle);
    res.send({message: response});
  }
})

app.get('/logout', function(req, res) {
  res.clearCookie('username');
  res.clearCookie('loggedin');
  res.send();
})

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('Listening on port' + port);
});
