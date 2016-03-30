var Faker = require('Faker');

function User(name, id, tag, handle, tweets, following, followers, img) {
  this.name = name;
  this.id = id;
  this.tagline = tag;
  this.handle = handle;
  this.tweets = tweets;
  this.following = following;
  this.followers = followers;
  this.img = img;
}

function Tweet(id, text, date) {
  this.id = id;
  this.text = text;
  this.date = date;
}

//var vietTweets = [new Tweet(1, 'Yay camp is over', new Date('November 17, 1995 04:45:17')), new Tweet(2, Faker.Lorem.sentence(), new Date('March 19, 2016 09:15:01')), new Tweet(3, 'OMG so awkard', new Date(2016, 3, 29, 3, 24, 55))];

var vietTweets = [new Tweet(0, 'OMG so awkard', Faker.Date.recent(50))];
makeTweets(vietTweets, 1, 50);

var benTweets = [new Tweet(0, '*incoherent mumbling*', Faker.Date.recent(50))];
makeTweets(benTweets, 1, 50);

var nathanTweets = [new Tweet(0, 'This API sux', Faker.Date.recent(50))];
makeTweets(nathanTweets, 1, 50);

var schlomoTweets = [new Tweet(0, 'Nathan is wrong'), Faker.Date.recent(50))];
makeTweets(schlomoTweets, 1, 50);

var viet = new User('Viet', 1, 'Camp was a lot different for me as a kid', 'viethle126', vietTweets, [], [], 'img/viet.png');

var ben = new User('Ben', 2, 'Nothing to put here', 'bgnewuch', benTweets, [], [], 'img/ben.png');

var nathan = new User('Nathan', 3, 'Treezrppl2', 'Treezrppl2', nathanTweets, [], [], 'img/nathan.png');

var schlomo = new User('Schlomo', 4, 'You speak, I skof', 'skofman', schlomoTweets, [], [], 'img/schlomo.png');

var users = {viet, ben, nathan, schlomo};

function makeTweets(user, id, num) {
  for(var i = 0; i < num; i++) {
    var temp = new Tweet(id+i, Faker.Lorem.sentence(), Faker.Date.recent(49));
    user.push(temp);
  }
}

// User.prototype.addFollower = function(follower) {
//   this.followers.push(follower);
// }
// User.prototype.addFollowing = function(following) {
//   this.following.push(following);
// }
//
// viet.addFollower(ben);
// viet.addFollower(nathan);
// viet.addFollower(schlomo);
//
// ben.addFollower(viet);
// ben.addFollower(nathan);
// ben.addFollower(schlomo);
//
// nathan.addFollower(ben);
// nathan.addFollower(viet);
// nathan.addFollower(schlomo);
//
// schlomo.addFollower(ben);
// schlomo.addFollower(nathan);
// schlomo.addFollower(viet);
//
// viet.addFollowing(ben);
// viet.addFollowing(nathan);
// viet.addFollowing(schlomo);
//
// ben.addFollowing(viet);
// ben.addFollowing(nathan);
// ben.addFollowing(schlomo);
//
// nathan.addFollowing(ben);
// nathan.addFollowing(viet);
// nathan.addFollowing(schlomo);
//
// schlomo.addFollowing(ben);
// schlomo.addFollowing(nathan);
// schlomo.addFollowing(viet);

module.exports = users;
