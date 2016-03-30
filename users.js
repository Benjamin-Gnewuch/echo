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

var vietTweets = [new Tweet(0, 'OMG so awkard', Faker.Date.recent(50))];
makeTweets(vietTweets, 1, 50);

var benTweets = [new Tweet(0, '*incoherent mumbling*', Faker.Date.recent(50))];
makeTweets(benTweets, 1, 50);

var nathanTweets = [new Tweet(0, 'This API sux', Faker.Date.recent(50))];
makeTweets(nathanTweets, 1, 50);

var schlomoTweets = [new Tweet(0, 'Nathan is wrong', Faker.Date.recent(50))];
makeTweets(schlomoTweets, 1, 50);

var viet = new User('Viet', 1, 'Camp was a lot different for me as a kid', 'viethle126', vietTweets, [2,3,4], [2,3,4], 'img/viet.png');

var ben = new User('Ben', 2, 'Nothing to put here', 'bgnewuch', benTweets, [1,3,4], [], 'img/ben.png');

var nathan = new User('Nathan', 3, 'Treezrppl2', 'Treezrppl2', nathanTweets, [1,2,4], [1,2,4], 'img/nathan.png');

var schlomo = new User('Schlomo', 4, 'You speak, I skof', 'skofman', schlomoTweets, [1,2,3], [1,2,3], 'img/schlomo.png');

var users = {
  1: viet,
  2: ben,
  3: nathan,
  4: schlomo};

function makeTweets(user, id, num) {
  for(var i = 0; i < num; i++) {
    var temp = new Tweet(id+i, Faker.Lorem.sentence(), Faker.Date.recent(49));
    user.push(temp);
  }
}

module.exports = users;
