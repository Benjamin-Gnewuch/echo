var tweetLocation = document.getElementById('tweet-list');
var lineBreak = document.createElement('br');

getProfile(4);

function getProfile(idNum) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/getprofile');
  var id = {id: idNum};
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = JSON.stringify(id);
  xhr.send(payload);

  xhr.addEventListener('load', function(event) {
    console.log((xhr.responseText));
    var response = JSON.parse(xhr.responseText);
    var user = response.message;
    prepProfile(user);
  });
}

function prepProfile(user) {
  clearTweets();

  populateProfile(user);

  for(var i = 0; i < user.tweets.length; i++) {
    console.log(user.tweets[i].date);
    var tweet = new Tweet(user.name, user.handle, user.tweets[i], user.img, user.tweets[i].date);
    generateTweet(tweet);
  }
}

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

function generateTweet(tweet) {
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

  var tweetHandle = document.createElement('h4');
  tweetHandle.className = 'media-heading';
  tweetHandle.textContent = tweet.handle;
  mediaBody.appendChild(tweetHandle);

  var tweetDate = document.createElement('small');
  tweetDate.textContent = tweet.date;
  mediaBody.appendChild(tweetDate);

  var tweetText = document.createElement('h5');
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
