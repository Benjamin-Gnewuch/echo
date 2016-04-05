var faker = require('faker');

var tweetCollection = function tweets() {
  var tweets = [
    makeTweet('@skofman', 'This is the first tweet', makeDate(12, 17, 1995, 03, 24), 0),
    makeTweet('@viethle126', 'This is the second tweet', makeDate(2, 28, 2001, 05, 15), 1),
    makeTweet('@treezrppl2', 'This is the third tweet', makeDate(7, 21, 2010, 01, 22), 2),
    makeTweet('@viethle126', 'This is the fourth tweet', makeDate(7, 21, 2010, 01, 22), 3),
    makeTweet('@skofman', 'This is the fifth tweet', makeDate(7, 21, 2010, 01, 22), 4),
    makeTweet('@treezrppl2', 'This is the sixth tweet', makeDate(7, 21, 2010, 01, 22), 5),
    makeTweet('@treezrppl2', 'This is the seventh tweet', makeDate(7, 21, 2010, 01, 22), 6),
    makeTweet('@viethle126', 'This is the eighth tweet', makeDate(7, 21, 2010, 01, 22), 7),
    makeTweet('@skofman', 'This is the ninth tweet', makeDate(7, 21, 2010, 01, 22), 8),
    makeTweet('@skofman', 'This is the tenth tweet', makeDate(7, 21, 2010, 01, 22), 9),
    makeTweet('@treezrppl2', 'This is the eleventh tweet', makeDate(7, 21, 2010, 01, 22), 10),
    makeTweet('@bgnewuch', 'lkJSDFBlkjsbfkrbfaf', makeDate(7, 22, 2010, 01, 14), 11)
  ];

  function getTweets() {
    return tweets;
  }

  function addTweet(tweet) {
    var newTweet = makeTweet(tweet.handle, tweet.text, tweet.date, tweets.length);
    tweets.push(newTweet);
    console.log('Tweet Added');
    console.log(tweets);
    return tweets;
  }

  return {
    tweets: getTweets,
    addTweet: addTweet
  }

}

function makeTweet(handle, text, date, id) {
  return {
    handle: handle,
    text: text,
    date: date,
    id: id
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

module.exports = tweetCollection();
