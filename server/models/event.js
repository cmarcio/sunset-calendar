var mongoose = require('mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/sunset-db', { useMongoClient: true });

// verify if the connection to db was successfull
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo DB connected!');
});

// create a schema
var eventSchema = new Schema({
  name: String,
  owner: { type: String, required: true },
  agenda: { type: Schema.Types.ObjectId, required: true },
  begin: Date,
  end: Date,
  all_day: Boolean,
  created_at: Date,
  updated_at: Date
});

// methods ============

// on every save, add the date
eventSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  
  if (!this.all_day) // if allday undefined set to false
    this.all_day = false;

  next();
});

// create a model using it
var Event = mongoose.model('Event', eventSchema);

// make this available to our users in our Node applications
module.exports = Event;
