const express = require('express');
const router = express.Router();

// grab the user model
var User = require('./../models/user');

// Create a new User (SignUp)
router.post('/:username', (req, res) => {
  if ( !req.query.password || !req.query.email ) // if the required filds are missing
    return res.status(500).send({error: 'missing parameters'});

  var newUser = User({
    username: req.params.username,
    email: req.query.email,
    name: req.query.name
  });
  newUser.password = newUser.generateHash(req.query.password); // hash the password
  
  // save the user
  newUser.save( err => {
    if ( err )  
      return res.status(500).send({error: err.errmsg});
    
    res.send('ok');
  });
});

// Get the user information (SignIn)
router.get('/:username', (req, res) => {
  if ( !req.query.password )
    return res.status(500).send({error: 'missing parameters'});
  
  // find user by username
  User.findOne({ username: req.params.username }, (err, user) => {
    if ( err ) 
      return res.status(500).send({error: err.errmsg});
    
    if ( !user ) 
      return res.status(500).send({error: 'User not found'});
    
    if ( !user.validPassword(req.query.password) ) 
      return res.status(500).send({error: 'wrong username or password'});
    
    res.send('ok');
  });
});

module.exports = router;