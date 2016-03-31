var tweetLocation = document.getElementById('tweet-list');
var lineBreak = document.createElement('br');


timeline();

function timeline() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/timeline');
  xhr.send();

  xhr.addEventListener('load', function() {
    var tweets = JSON.parse(xhr.responseText);
    prepTimeline(tweets);
  });
}

function storeUsers(users) {
  userCollection = users;
}

function prepTimeline(tweets) {
  clearTweets();

  for(var i = tweets.length-1; i >= 0; i--) {
    matchUser(tweets[i], makeTweet);
  }
}

function makeTweet(tweet, user) {
  var tweet = new Tweet(user.name, tweet.handle, tweet.text, user.img, tweet.date);

  generateTweet(tweet);
}

function matchUser(tweet, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/users');
  xhr.send();

  xhr.addEventListener('load', function() {
    var users = JSON.parse(xhr.responseText);

    for(var i = 0; i < users.length; i++) {
      if(users[i].handle == tweet.handle) {
        callback(tweet, users[i]);
      }
    }
  });
}

function Tweet(name, handle, content, img, date) {
  this.name = name;
  this.handle = handle;
  this.content = content;
  this.img = img;
  this.date = date;
}

function generateTweet(tweet) {
  var tweetElement = document.createElement('a');
  tweetElement.className = 'list-group-item vspace0';

  tweetLocation.appendChild(tweetElement);
  tweetContent(tweetElement, tweet);
}

function tweetContent(location, tweet) {
  var media = document.createElement('div');
  media.className = 'media';
  location.appendChild(media);

  var mediaLeft = document.createElement('div');
  mediaLeft.className = 'media-left media-top';
  media.appendChild(mediaLeft);

  var mediaImg = document.createElement('img');
  mediaImg.className = 'media-object tweet-icon img-rounded';
  mediaImg.src = tweet.img;
  mediaLeft.appendChild(mediaImg);


  var mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  media.appendChild(mediaBody);

  var tweetName = document.createElement('h5');
  tweetName.className = 'media-heading';
  tweetName.textContent = tweet.name;
  mediaBody.appendChild(tweetName);

  var tweetHandle = document.createElement('h5');
  tweetHandle.className = 'media-heading';
  tweetHandle.textContent = tweet.handle;
  mediaBody.appendChild(tweetHandle);

  var tweetDate = document.createElement('p');
  tweetDate.textContent = tweet.date;
  mediaBody.appendChild(tweetDate);

  var tweetText = document.createElement('h4');
  tweetText.className = 'tweet-text';
  tweetText.textContent = tweet.content;
  mediaBody.appendChild(tweetText);
}

function clearTweets() {
  var tweets = document.getElementById('tweet-list');
  while(tweets.firstChild) {
    tweets.removeChild(tweets.firstChild);
  }
}

//////////////////////////////////////////////////////////////////////////////////

//getProfile(4, prepProfile);

// function prepProfile(user) {
//   clearTweets();
//   populateProfile(user);
//
//   for(var i = 0; i < user.following.length; i++) {
//     getProfile(user.following[i], populateFollowing);
//   }
//
//   for(var i = 0; i < user.tweets.length; i++) {
//     var tweet = new Tweet(user.name, user.handle, user.tweets[i], user.img, user.tweets[i].date);
//     generateTweet(tweet);
//   }
// }

// function getProfile(idNum, method) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/getprofile');
//   var id = {id: idNum};
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   var payload = JSON.stringify(id);
//   xhr.send(payload);
//
//   xhr.addEventListener('load', function(event) {
//     var response = JSON.parse(xhr.responseText);
//     var user = response.message;
//
//     method(user);
//   });
// }

// function populateFollowing(user) {
//   var location = document.getElementById('following');
//
//   var link = document.createElement('a');
//   location.appendChild(link);
//
//   var media = document.createElement('div');
//   media.className = 'media hoffset1';
//   link.appendChild(media);
//   media.dataset.id = user.id;
//
//   var mediaLeft = document.createElement('div');
//   mediaLeft.className = 'media-left media-middle';
//   media.appendChild(mediaLeft);
//
//   var mediaImg = document.createElement('img');
//   mediaImg.className = 'media-object smaller-icon img-rounded';
//   mediaImg.src = user.img;
//   mediaLeft.appendChild(mediaImg);
//
//   var mediaBody = document.createElement('div');
//   mediaBody.className = 'media-body';
//   media.appendChild(mediaBody);
//
//   var name = document.createElement('h4');
//   name.className = 'media-heading';
//   name.textContent = user.name;
//   mediaBody.appendChild(name);
//
//   var handle = document.createElement('small');
//   handle.className = 'media-heading';
//   handle.textContent = '@' + user.handle;
//   mediaBody.appendChild(handle);
// }

// function populateProfile(user){
//   var profPic = document.getElementById('profile-img');
//   var username = document.getElementById('username');
//   var handle = document.getElementById('handle');
//   var tagline = document.getElementById('tagline');
//
//   profPic.src = user.img;
//   username.textContent = user.name;
//   handle.textContent = '@' + user.handle;
//   tagline.textContent = user.tagline;
// }
