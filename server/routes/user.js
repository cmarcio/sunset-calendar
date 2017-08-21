const express = require('express');
const router = express.Router();

// grab the user model
var User = require('./../models/user');

router.get('/', (req, res) => {
  res.send('user works');
});

// user signup
router.get('/signup', (req, res) => {
  if ( !req.query.username || !req.query.password || !req.query.email )
    return res.status(500).send({error: 'missing atributes'});
  
  // create a new user
  var newUser = User({
    name: req.query.name,
    username: req.query.username,
    email: req.query.email
  });
  newUser.password = newUser.generateHash(req.query.password);
  
  // save the user
  newUser.save( err => {
    if ( err )
      return res.status(500).send({error: 'username or email already exists'});
    
    res.send('ok');
  });
});

// user log in
router.get('/signin', (req, res) => {
  if ( !req.query.username || !req.query.password )
    return res.status(500).send({error: 'missing atributes'});
  
  // find user by username
  User.findOne({ username: req.query.username }, (err, user) => {
    if ( err ) 
      return res.status(500).send({error: err});
    
    if ( !user ) 
      return res.status(500).send({error: 'User not found'});
    
    if ( !user.validPassword(req.query.password) ) 
      return res.status(500).send({error: 'wrong username or password'});
    
    res.send('ok');
  });
});

/*/ Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});*/

module.exports = router;