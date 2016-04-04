var Faker = require('Faker');

function User(name, id, tag, handle, following, followers, img, pw) {
  this.name = name;
  this.id = id;
  this.tagline = tag;
  this.handle = handle;
  this.following = following;
  this.followers = followers;
  this.img = img;
  this.pw = pw;
}

var userCollection = function users() {
  var users = [
    new User('Viet Le', 1, 'Camp was a lot different for me as a kid', '@viethle126', ['@bgnewuch', '@treezrppl2', '@skofman'], ['@bgnewuch', '@treezrppl2', '@skofman'], 'img/viet.png', 'viet'),
    new User('Ben Gnewuch', 2, '*incoherent mumbling*', '@bgnewuch', ['@skofman'], ['@viethle126', '@treezrppl2', '@skofman'], 'img/ben.png', 'ben'),
    new User('Nathan Walston', 3, 'Treezrppl2 guyz', '@treezrppl2', ['@bgnewuch', '@viethle126', '@skofman'], ['@bgnewuch', '@viethle126', '@skofman'], 'img/nathan.png', 'nathan'),
    new User('Schlomo Skofman', 4, 'You speak, I skof', '@skofman', ['@bgnewuch', '@treezrppl2', '@viethle126'], ['@bgnewuch', '@treezrppl2', '@viethle126'], 'img/schlomo.png', 'schlomo')
  ];

  function getUsers() {
    return users;
  }

  function changeUser(newUser) {
    for(var i = 0; i < users.length; i++) {
      if(users[i].handle == newUser.handle) {
        users[i] = newUser;
        console.log('User File Modified');
        return users;
      }
    }
    console.log('New User Added');
    users.push(newUser);
    return users;
  }

  function login(credentials) {
    for(var i = 0; i < users.length; i++) {
      if(credentials.handle == users[i].handle) {
        if(credentials.pw == users[i].pw) {
          return users[i];
        }
        else {
          return 401;
        }
      }
    }
    return 404;
  }

  return {
    users: getUsers,
    change: changeUser,
    authorize: login
  }
}

module.exports = userCollection();
