const express = require('express');
const router = express.Router();

// grab the event model
var Event = require('./../models/event');
var User = require('./../models/user');

// create event
router.post('/', (req, res) => {
  if ( !req.query.owner || !req.query.agenda || !req.query.password )
    return res.status(500).send({error: 'missing atributes'});

  // verify if the user is authenticated
  User.findOne({username: req.query.owner}, (err, user) => {
    if ( !err && user && user.validPassword(req.query.password) ) {
        // create a new agenda
        var newEvent = Event({
            agenda: req.query.agenda,
            owner: req.query.owner,
            begin: req.query.begin,
            end: req.query.end,
            all_day: req.query.all_day,
            name: req.query.name
        });

        // save the agenda
        newEvent.save( err => {
            if ( err )
                return res.status(500).send({error: err.errmsg});
            res.send('ok');
        });
    }
    else res.status(500).send({error: 'authentication failed'});
  });
});

// get all events
router.get('/', (req, res) => {
  if ( !req.query.owner || !req.query.password )
    return res.status(500).send({error: 'missing atributes'});
  
  // verify if the user is authenticated
  User.findOne({username: req.query.owner}, (err, user) => {
    if ( !err && user && user.validPassword(req.query.password) ) {
        // find events from user
        Event.find({ owner: user.username }, (err, events) => {
            if ( err ) 
                return res.status(500).send({error: err.errmsg});
            
            if ( !events ) 
                return res.status(500).send({error: 'events not found'});
            
            res.send(events);
        });
    }
    else res.status(500).send({error: 'authentication failed'});
  });
});

// update event
router.put('/:id', (req, res) => {
    if ( !req.query.owner || !req.query.password )
        return res.status(500).send({error: 'missing atributes'});
      
    // verify if the user is authenticated
    User.findOne({username: req.query.owner}, (err, user) => {
        if ( !err && user && user.validPassword(req.query.password) ) {
            // find events by id and update atributes
            Event.findByIdAndUpdate(req.params.id, 
                {
                    name: req.query.name,
                    begin: req.query.begin,
                    end: req.query.end,
                    all_day: req.query.all_day
                }, (err, event) => {
                    if ( err ) 
                        return res.status(500).send({error: err.errmsg});
                    
                    if ( !event ) 
                        return res.status(500).send({error: 'event not found'});
                    
                    res.send(event);
                }
            );
        }
        else res.status(500).send({error: 'authentication failed'});
    });
});

// delete event
router.delete('/:id', (req, res) => {
    if ( !req.query.owner || !req.query.password )
        return res.status(500).send({error: 'missing parameters'});
      
    // verify if the user is authenticated
    User.findOne({username: req.query.owner}, (err, user) => {
        if ( !err && user && user.validPassword(req.query.password) ) {
            // find event by id and delete
            Event.findByIdAndRemove(req.params.id, err => {
                if ( err ) 
                    return res.status(500).send({error: err.errmsg});
                                
                res.send('deleted');
            });
        }
        else res.status(500).send({error: 'authentication failed'});
    });
});

module.exports = router;