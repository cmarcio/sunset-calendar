// grab the things we need
var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/sunset-db', { useMongoClient: true });

// verify if the connection to db was successfull
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo DB connected!');
});

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  created_at: Date,
  updated_at: Date
});

// methods ======================

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// on every save, add the date
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
  
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;
    
    next();
});

// create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;