var faker = require('faker');

var tweetCollection = function tweets() {
  var tweets = [];

  function generateTweets(num) {
    while(num > 0) {
      tweets.push(makeRandomTweet());
      num--;
    }
  }

  function getTweets() {
    return tweets;
  }

  function getTweet(id) {
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].id == id) {
        return tweets[i];
      }
    }
    return 'Tweet not found';
  }

  function incrementFavorite(id) {
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].id == id) {
        tweets[i].favoriteCount++;
      }
    }
    return tweets;
  }

  function decrementFavorite(id) {
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].id == id) {
        tweets[i].favoriteCount--;
      }
    }
    return tweets;
  }

  function addTweet(tweet) {
    var newTweet = makeTweet(tweet.handle, tweet.text, tweet.date, tweets.length, 0);
    tweets.push(newTweet);
    return tweets;
  }

  return {
    generateTweets: generateTweets,
    tweets: getTweets,
    tweet: getTweet,
    incrementFavorite: incrementFavorite,
    decrementFavorite: decrementFavorite,
    addTweet: addTweet
  }

}

function makeTweet(handle, text, date, id, favoriteCount) {
  return {
    handle: handle,
    text: text,
    date: date,
    id: id,
    favoriteCount: favoriteCount
  }
}

function makeDate(month, day, year, hours, minutes) {
  return {
    month: month,
    day: day,
    year: year,
    hours: hours,
    minutes: minutes
  }
}

function random(val) {
  return Math.round(Math.random() * val);
}

var id = 12;

function makeRandomTweet() {
  var handles = ['@viethle126', '@bgnewuch', '@treezrppl2', '@skofman'];
  var index = random(handles.length);
  var handle = handles[index];

  var text = faker.Lorem.sentences() + ' #' + faker.random.catch_phrase_descriptor() + faker.random.catch_phrase_noun();

  //+ '#' + faker.random.words()

  var date = randomDate();

  var thisID = id;
  id++;

  var favoriteCount = faker.random.number(7);

  return {
    handle: handle,
    text: text,
    date: date,
    id: id,
    favoriteCount: favoriteCount
  }
}

var year = 2010;
var month = 7;
var day = 23;

var long = [1,3,5,7,8,10,12];
var middle = [4,6,9,11];
var short = [2];
var monthLength = 'long';

function randomDate() {
  var hours = random(24);
  var minutes = random(60);

  var date = (makeDate(month, day, year, hours, minutes));


  if(day == 28 && monthLength == 'short') {
    nextMonth();
  }
  else if(day == 30 && monthLength == 'middle') {
    nextMonth();
  }
  else if(day == 31 && monthLength == 'long') {
    nextMonth();
  }
  else {
    day++;
  }
  return date;
}

function nextMonth() {
  day = 1;
  if(month == 12) {
    month = 1;
    year++;
  }
  else {
    month++;
  }

  if(long.indexOf(month) != -1) {
    monthLength = 'long';
  }
  else if(middle.indexOf(month) != -1) {
    monthLength = 'middle';
  }
  else {
    monthLength = 'short';
  }
}

module.exports = tweetCollection();
