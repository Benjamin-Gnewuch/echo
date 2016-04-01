var Faker = require('Faker');

function User(name, id, tag, handle, following, followers, img) {
  this.name = name;
  this.id = id;
  this.tagline = tag;
  this.handle = handle;
  this.following = following;
  this.followers = followers;
  this.img = img;
}

var userCollection = function users() {
  var users = [
    new User('Viet', 1, 'Camp was a lot different for me as a kid', '@viethle126', ['@bgnewuch', '@treezrppl2', '@skofman'], ['@bgnewuch', '@treezrppl2', '@skofman'], 'img/viet.png'),
    new User('Ben', 2, '*incoherent mumbling*', '@bgnewuch', ['@viethle126', '@treezrppl2', '@skofman'], ['@viethle126', '@treezrppl2', '@skofman'], 'img/ben.png'),
    new User('Nathan', 3, 'Treezrppl2 guyz', '@treezrppl2', ['@bgnewuch', '@viethle126', '@skofman'], ['@bgnewuch', '@viethle126', '@skofman'], 'img/nathan.png'),
    new User('Schlomo', 4, 'You speak, I skof', '@skofman', ['@bgnewuch', '@treezrppl2', '@viethle126'], ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/schlomo.png')
  ];

  function getUsers() {
    return users;
  }

  return {
    users: getUsers
  }
}

module.exports = userCollection();
