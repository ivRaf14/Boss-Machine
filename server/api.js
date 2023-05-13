const express = require('express');
const method = require('./db.js')
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const apiRouter = express.Router();


apiRouter.param('id', (req, res, next, id) => {
    const idea = method.getFromDatabaseById('ideas', id);
    if (!idea) {
       res.status(404).send();
    } else {
       req.ideas = idea;
       next();
    }
 });

apiRouter.get('/ideas/:id', (req,res,next) => {
   res.send(req.ideas)
})

apiRouter.get('/ideas', (req,res,next) => {
    res.send(method.getAllFromDatabase('ideas'))
});

apiRouter.post('/ideas',checkMillionDollarIdea , (req,res,next) => {
    const body = req.body;
    res.status(201).send(method.addToDatabase('ideas', body))
})


apiRouter.put('/ideas/:id',checkMillionDollarIdea,   (req,res,next) => {
    const body = req.body;
    res.send(method.updateInstanceInDatabase('ideas', body));
    
})

apiRouter.delete('/ideas/:id', (req,res,next) => {

    res.status(204).send(method.deleteFromDatabasebyId('ideas', req.params.id))
})


//meetings
apiRouter.get('/meetings', (req,res,next) => {
    res.send(method.getAllFromDatabase('meetings'))
})

apiRouter.post('/meetings', (req,res,next) => {
    const newmeet = method.createMeeting();
    const add = method.addToDatabase('meetings', newmeet);
    if(add != null) res.status(201).send(newmeet);
    else res.status(404).send()
   
})

apiRouter.delete('/meetings', (req,res,next) => {
    method.deleteAllFromDatabase('meetings');
    res.status(204).send()
})



module.exports = apiRouter;
