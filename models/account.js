const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
  username: String,
  password: String,
  name: String,
  githubId: String,
});

// TODO: Add name to schema through the form using local auth
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
