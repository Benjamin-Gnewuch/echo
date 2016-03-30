function tweetCollection() {
  var tweets = [
    makeTweet(1, "This is the first tweet", 'December 17, 1995 03:24:00'),
    makeTweet(2, "This is the second tweet", 'February 28, 2001 05:15:17'),
    makeTweet(3, "This is the third tweet", 'July 21, 2010 01:22:13'),
    makeTweet(2, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(1, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(3, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(3, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(2, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(1, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(1, "Nonsense", 'July 21, 2010 01:22:13'),
    makeTweet(3, "Nonsense", 'July 21, 2010 01:22:13'),

  ];

  function printTweets() {
    return tweets;
  }
  return {
    tweets: printTweets
  }

}

function makeTweet(id, text, date) {
  return {
    id: id,
    text: text,
    date: date
  }
}

module.exports = tweetCollection();








// var Faker = require('Faker');
//
//
//
// var tweetCollection = function() {
//   var tweets = [];
//
//   function getTweets(id) {
//     userTweets = [];
//     for(var i = 0; i < tweets.length; i++) {
//       if(tweets[i].id == id) {
//         userTweets.push(tweets[i]);
//       }
//     }
//     return userTweets;
//   }
//
//   function allTweets() {
//     console.log(tweets);
//     return tweets;
//   }
//
//   function newTweet(id, text, date) {
//     userTweets.push(new Tweet(id, text, date));
//   }
//   return {
//     userTweets: getTweets,
//     all: allTweets,
//     newTweet: newTweet
//   }
// }
//
// function makeTweets(tweets, id, num) {
//   for(var i = 0; i < num; i++) {
//     var temp = new Tweet(id, Faker.Lorem.sentence(), Date.now());
//     tweets.push(temp);
//   }
// }
//
// module.exports = tweetCollection();
