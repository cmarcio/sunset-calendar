const express = require('express');
const router = express.Router();

// grab the agenda model
var Agenda = require('./../models/agenda');
var User = require('./../models/user');

// create agenda
router.post('/', (req, res) => {
  if ( !req.body.owner || !req.body.password )
    return res.status(422).send({error: 'missing parameters'});

  // verify if the user is authenticated
  User.findOne({username: req.body.owner}, (err, user) => {
    if ( !err && user && user.validPassword(req.body.password) ) {
        // create a new agenda
        var newAgenda = Agenda({
            name: req.body.name,
            owner: req.body.owner,
            color: req.body.color
        });

        // save the agenda
        newAgenda.save( err => {
            if ( err )
                return res.status(422).send({error: err.errmsg});
            res.send('ok');
        });
    }
    else res.status(422).send({error: 'authentication failed'});
  });
});

// get all agendas
router.get('/', (req, res) => {
  if ( !req.query.owner || !req.query.password )
    return res.status(422).send({error: 'missing parameters'});
  
  // verify if the user is authenticated
  User.findOne({username: req.query.owner}, (err, user) => {
    if ( !err && user && user.validPassword(req.query.password) ) {
        // find agendas from owner
        Agenda.find({ owner: user.username }, (err, agendas) => {
            if ( err ) 
                return res.status(422).send({error: err.errmsg});
            
            if ( !agendas ) 
                return res.status(422).send({error: 'agendas not found'});
            
            res.send(agendas);
        });
    }
    else res.status(422).send({error: 'authentication failed'});
  });
});

// update agenda
router.put('/:id', (req, res) => {
    if ( !req.body.owner || !req.body.password )
        return res.status(422).send({error: 'missing parameters'});
      
    // verify if the user is authenticated
    User.findOne({username: req.body.owner}, (err, user) => {
        if ( !err && user && user.validPassword(req.body.password) ) {
            // find agendas by id and update parameters
            Agenda.findByIdAndUpdate(req.params.id, 
                {color: req.body.color, name: req.body.name } ,(err, agenda) => {
                if ( err ) 
                    return res.status(422).send({error: err.errmsg});
                
                if ( !agenda ) 
                    return res.status(422).send({error: 'agenda not found'});
                
                res.send(agenda);
            });
        }
        else res.status(422).send({error: 'authentication failed'});
    });
});

// delete agenda
router.delete('/:id', (req, res) => {
    if ( !req.query.owner || !req.query.password )
        return res.status(422).send({error: 'missing parameters'});
      
    // verify if the user is authenticated
    User.findOne({username: req.query.owner}, (err, user) => {
        if ( !err && user && user.validPassword(req.query.password) ) {
            // find agendas by id and delete
            Agenda.findByIdAndRemove(req.params.id, err => {
                if ( err ) 
                    return res.status(422).send({error: err.errmsg});
                                
                res.send('deleted');
            });
        }
        else res.status(422).send({error: 'authentication failed'});
    });
});

module.exports = router;