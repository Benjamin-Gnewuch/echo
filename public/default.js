var tweetLocation = document.getElementById('tweet-list');
var lineBreak = document.createElement('br');
var mainUser;

timeline();
getProfile('@bgnewuch', setMainUser);

//Used for testing, main user is the loggedin user until login is added
function setMainUser(user) {
  mainUser = user;

  prepProfile(mainUser);
}

//Gets ALL tweets
function timeline() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/timeline');
  xhr.send();

  xhr.addEventListener('load', function() {
    var tweets = JSON.parse(xhr.responseText);
    prepTimeline(tweets);
  });
}

//Calls clearTweets() and matches each tweet to it's author
function prepTimeline(tweets) {
  clearTweets();

  for(var i = tweets.length-1; i >= 0; i--) {
    matchUser(tweets[i], makeTweet);
  }
}

//Creates a new tweet, combining data from tweets and user, calls generateTweet
function makeTweet(tweet, user) {
  var tweet = new Tweet(user.name, tweet.handle, tweet.text, user.img, tweet.date);

  generateTweet(tweet);
}

//Gets users from backend, matches a user to the tweet, then calls callback
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

//Tweet constructor
function Tweet(name, handle, content, img, date) {
  this.name = name;
  this.handle = handle;
  this.content = content;
  this.img = img;
  this.date = date;
}

//Takes in a tweet, sets up location in DOM, then calls tweetContent
function generateTweet(tweet) {
  var tweetElement = document.createElement('a');
  tweetElement.className = 'list-group-item vspace0';

  tweetElement.dataset.type = 'tweet';
  tweetElement.dataset.handle = tweet.handle;
  tweetLocation.appendChild(tweetElement);
  tweetContent(tweetElement, tweet);
}

//Creates a media object and fills it with a tweet's data, appends to the DOM
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

  var tweetTime = setDate(tweet.date);
  (tweetTime);
  var tweetDate = document.createElement('p');
  tweetDate.textContent = tweetTime.toDateString();
  mediaBody.appendChild(tweetDate);

  var tweetText = document.createElement('h4');
  tweetText.className = 'tweet-text';
  tweetText.textContent = tweet.content;
  mediaBody.appendChild(tweetText);
}

//Takes in the date from a tweet, and creates a Date object to be returned
function setDate(date) {
  var newDate = new Date();
  newDate.setMonth(date.month, date.day);
  newDate.setYear(date.year);
  newDate.setHours(date.hours, date.minutes)

  return newDate;
}

//Clears all tweets in the DOM
function clearTweets() {
  var tweets = document.getElementById('tweet-list');
  while(tweets.firstChild) {
    tweets.removeChild(tweets.firstChild);
  }
}

document.addEventListener('click', function(event) {
  function findTarget(clicked) {
    for(var target = clicked; target != document; target = target.parentNode) {
      if(target.hasAttribute('data-type')) {
        console.log(target);
        return target;
      }
    }
  }
  var target = findTarget(event.target);
  handleEvent(target)
});

//Handles events sent to it from Global Event Listener
function handleEvent(target) {
  if(target.dataset.type == 'tweet' || target.dataset.type == 'user') {
    getProfile(target.dataset.handle, prepProfile);
  }
  else if(target.dataset.type == 'button') {
    handleButton(target);
  }
}

//Specifically handles any button clicked
function handleButton(target) {
  if(target.dataset.id == 'follow') {
    toggleFollowing(target.dataset.handle);
    pushUser(mainUser);
    getProfile(target.dataset.handle, populateProfile)
  }
  else if(target.dataset.id == 'home') {
    prepProfile(mainUser);
    timeline();
  }
}

//Calls: clearTweets, clearFollowing, populateProfile, and profileTweets
//calls getProfile and sets it each user the person is following to be populated
function prepProfile(user) {
  clearTweets();
  clearFollowing();
  populateProfile(user);
  profileTweets(user);

  for(var i = 0; i < user.following.length; i++) {
    getProfile(user.following[i], populateFollowing);
  }
}

//Gets all tweets, takes the ones posted by user, builds each tweet, and sends it to generateTweet
function profileTweets(user) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/timeline');
  xhr.send();

  xhr.addEventListener('load', function() {
    var tweets = JSON.parse(xhr.responseText);

    var userTweets = [];
    for(var i = 0; i < tweets.length; i++) {
      if(tweets[i].handle == user.handle) {
        userTweets.push(tweets[i]);
      }
    }

    for(var i = userTweets.length-1; i >= 0; i--) {
      var tweet = new Tweet(user.name, user.handle, userTweets[i].text, user.img, userTweets[i].date);
      generateTweet(tweet);
    }
  });
}

//Sends a handle to the backend to get the matching user, sends the user to the callback
function getProfile(handle, method) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/getprofile');
  var handle = {handle: handle};
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = (JSON.stringify(handle));
  xhr.send(payload);

  xhr.addEventListener('load', function(event) {
    var response = JSON.parse(xhr.responseText);
    var user = response.message;

    method(user);
  });
}

//Takes a user and sends them to the backend to update database
function pushUser(user) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/pushuser');
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = JSON.stringify(user);
  xhr.send(payload);

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    var message = response.message;
    console.log(message);
  })
}

//Takes a user, and puts their info into the profile header, calls checkFollowing
function populateProfile(user){
  var profPic = document.getElementById('profile-img');
  var username = document.getElementById('username');
  var handle = document.getElementById('handle');
  var tagline = document.getElementById('tagline');

  profPic.src = user.img;
  username.textContent = user.name;
  handle.textContent = user.handle;
  tagline.textContent = user.tagline;

  checkFollowing(user);
}

//Takes a user, and populates a location in the Following box in the DOM
function populateFollowing(user) {
  var location = document.getElementById('following');
  location.className = 'list-group';

  var link = document.createElement('a');
  link.className = 'list-group-item following';
  link.dataset.handle = user.handle;
  link.dataset.type = 'user';

  location.appendChild(link);

  var media = document.createElement('div');
  media.className = 'media hoffset1';
  link.appendChild(media);

  var mediaLeft = document.createElement('div');
  mediaLeft.className = 'media-left media-top';
  media.appendChild(mediaLeft);

  var mediaImg = document.createElement('img');
  mediaImg.className = 'media-object smaller-icon img-rounded';
  mediaImg.src = user.img;
  mediaLeft.appendChild(mediaImg);

  var mediaBody = document.createElement('div');
  mediaBody.className = 'media-body';
  media.appendChild(mediaBody);

  var name = document.createElement('span');
  name.className = 'vpsacenone';
  name.textContent = user.name;
  mediaBody.appendChild(name);

  var newLine = document.createElement('br');
  mediaBody.appendChild(newLine);

  var handle = document.createElement('span');
  handle.textContent = user.handle;
  mediaBody.appendChild(handle);
}

//Takes a handle, if user is being followed, unfollow, if not, then add to follow
function toggleFollowing(handle) {
  for(var i = 0; i < mainUser.following.length; i++) {
    if(mainUser.following[i] == handle) {
      mainUser.following.splice(i,1);
      return;
    }
  }
  mainUser.following.push(handle);
}

//Takes a user, decide 'Follow' button text based on if mainUser is following them
function checkFollowing(user) {
  var follow = document.getElementById('btn-follow');
  follow.className = 'btn btn-primary vspace4';
  follow.dataset.handle = user.handle;

  var following = mainUser.following.toString();
  if(following.includes(user.handle)) {
    follow.textContent = 'Unfollow';
  }
  else if (user.handle == mainUser.handle) {
    follow.className = 'btn btn-primary vspace4 conceal';
  }
  else {
    follow.textContent = 'Follow';
  }
}

//Clears the DOM of all the users followed by current profile
function clearFollowing() {
  var following = document.getElementById('following');
  while(following.firstChild) {
    following.removeChild(following.firstChild);
  }
}
