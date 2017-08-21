const express = require('express');
const router = express.Router();

// grab the agenda model
var Agenda = require('./../models/agenda');
var User = require('./../models/user');

//router.get('/', (req, res) => {
//  res.send('agenda works');
//});

// create agenda
router.get('/new', (req, res) => {
  if ( !req.query.owner || !req.query.name || !req.query.color || !req.query.password )
    return res.status(500).send({error: 'missing atributes'});

  // verify if the user is authenticated
  User.findOne({username: req.query.owner}, (err, user) => {
    if ( !err && user && user.validPassword(req.query.password) ) {
        // create a new agenda
        var newAgenda = Agenda({
            name: req.query.name,
            owner: req.query.owner,
            color: req.query.color
        });

        // save the agenda
        newAgenda.save( err => {
            if ( err )
                return res.status(500).send({error: err});
            res.send('ok');
        });
    }
    else res.status(500).send({error: 'authentication failed'});
  });
});

// get all agendas
router.get('/all', (req, res) => {
  if ( !req.query.owner || !req.query.password )
    return res.status(500).send({error: 'missing atributes'});
  
  // verify if the user is authenticated
  User.findOne({username: req.query.owner}, (err, user) => {
    if ( !err && user && user.validPassword(req.query.password) ) {
        // find agendas from owner
        Agenda.find({ owner: user.username }, (err, agendas) => {
            if ( err ) 
                return res.status(500).send({error: err});
            
            if ( !agendas ) 
                return res.status(500).send({error: 'agendas not found'});
            
            res.send(agendas);
        });
    }
    else res.status(500).send({error: 'authentication failed'});
  });
});

// update agenda
router.get('/update/:id', (req, res) => {
    if ( !req.query.owner || !req.query.password || !req.query.color || !req.query.name )
        return res.status(500).send({error: 'missing atributes'});
      
    // verify if the user is authenticated
    User.findOne({username: req.query.owner}, (err, user) => {
        if ( !err && user && user.validPassword(req.query.password) ) {
            // find agendas by id and update atributes
            Agenda.findByIdAndUpdate(req.params.id, 
                {color: req.query.color, name: req.query.name } ,(err, agenda) => {
                if ( err ) 
                    return res.status(500).send({error: err});
                
                if ( !agenda ) 
                    return res.status(500).send({error: 'agenda not found'});
                
                res.send(agenda);
            });
        }
        else res.status(500).send({error: 'authentication failed'});
    });
});

// delete agenda

module.exports = router;