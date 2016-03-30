var tweetLocation = document.getElementById('tweet-list');

var xhr = new XMLHttpRequest();
xhr.open('GET', '/viet');
xhr.send();

xhr.addEventListener('load', function(event) {
  var user = JSON.parse(xhr.responseText);

  clearTweets();

  populateProfile(user);

  for(var i = 0; i < user.tweets.length; i++) {
    console.log(user.tweets[i].date);
    var tweet = new Tweet(user.name, user.handle, user.tweets[i], user.img, user.tweets[i].date);
    newTweet(tweet);
  }
});

function populateProfile(user){
  var profPic = document.getElementById('profile-img');
  var username = document.getElementById('username');
  var tagline = document.getElementById('tagline');

  profPic.src = user.img;
  username.textContent = user.name;
  tagline.textContent = user.tagline;
}

function Tweet(name, handle, content, img, date) {
  this.name = name;
  this.handle = handle;
  this.content = content;
  this.img = img;
  this.date = date;
}

function newTweet(tweet) {
  var tweetElement = document.createElement('li');
  tweetElement.className = 'list-group-item';

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
  mediaImg.className = 'media-object tweet-icon';
  mediaImg.src = tweet.img;
  mediaLeft.appendChild(mediaImg);


  var mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  media.appendChild(mediaBody);

  var tweetHandle = document.createElement('h5');
  tweetHandle.className = 'media-heading';
  tweetHandle.textContent = tweet.handle;
  mediaBody.appendChild(tweetHandle);


  var tweetText = document.createElement('p');
  tweetText.className = 'tweet-text';
  tweetText.textContent = tweet.content.text;
  mediaBody.appendChild(tweetText);
}

function clearTweets() {
  var tweets = document.getElementById('tweet-list');
  while(tweets.firstChild) {
    tweets.removeChild(tweets.firstChild);
  }
}
