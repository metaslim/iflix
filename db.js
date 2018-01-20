var Content = require('./api/models/contentModel');
var Rate = require('./api/models/rateModel');
var User = require('./api/models/userModel');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rate_db');

module.exports.seed_data = function () {
  seedUsers();
  seedContent();
};

function seedUsers() {
  const users = [
    { first_name: 'Tony', last_name: 'Stark' },
    { first_name: 'Thor', last_name: 'Odinson' },
    { first_name: 'Hank', last_name: 'Pym' },
    { first_name: 'Bruce', last_name: 'Banner' },
    { first_name: 'Janet', last_name: 'Dyne' },
    { first_name: 'Steve', last_name: 'Rogers' },
    { first_name: 'Clinton', last_name: 'Barton' },
    { first_name: 'Natasha', last_name: 'Romanoff' },
    { first_name: 'Samuel', last_name: 'Wilson' },
    { first_name: 'James', last_name: 'Rhodes' },
    { first_name: 'Peter', last_name: 'Parker' },
    { first_name: 'Scott', last_name: 'Lang' },
    { first_name: 'James', last_name: 'Barnes' },
    { first_name: 'Sharon', last_name: 'Carter' },
    { first_name: 'Stephen', last_name: 'Strange' },
    { first_name: 'Peter', last_name: 'Quill' }
  ];

  for (user of users) {
    var newUser = new User(user);
    newUser.save();
  }
}

function seedContent() {
  const contents = [
    { name: 'Iron Man' },
    { name: 'The Incredible Hulk' },
    { name: 'Iron Man 2' },
    { name: 'Thor' },
    { name: 'Captain America: The First Avenger' },
    { name: 'The Avengers' },
    { name: 'Iron Man 3' },
    { name: 'Thor: The Dark World' },
    { name: 'Captain America: The Winter Soldier' },
    { name: 'Guardians of the Galaxy' },
    { name: 'Avengers: Age of Ultron' },
    { name: 'Ant-Man' },
    { name: 'Captain America: Civil War' },
    { name: 'Doctor Strange' },
    { name: 'Guardians of the Galaxy Vol. 2' },
    { name: 'Spider-Man: Homecoming' },
    { name: 'Thor: Ragnarok' }

  ];

  for (content of contents) {
    var newContent = new Content(content);
    newContent.save();
  }
}
