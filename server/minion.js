const minionRouter = require('express').Router();
const method = require('./db');

minionRouter.param('id', (req,res,next, val) => {
    const find = method.getFromDatabaseById('minions', val);
    if(find){
        req.minion = find;
        next();
    }
    else res.status(404).send()
})

minionRouter.get('/minions/:id', (req,res,next) => {
    res.send(req.minion)
})

minionRouter.get('/minions', (req,res,next) => {
    res.send(method.getAllFromDatabase('minions'))
});

minionRouter.post('/minions', (req,res,next) => {
     const body = req.body;
    res.status(201).send(method.addToDatabase('minions', body));
})

minionRouter.put('/minions/:id', (req,res,next) => {
     const body = req.body;
    res.send(method.updateInstanceInDatabase('minions', body));
})

minionRouter.delete('/minions/:id', (req,res,next) => {
    res.status(204).send(method.deleteFromDatabasebyId('minions', req.params.id));
})


const workData = method.getAllFromDatabase('work');

const searchWorkByMinionId = (id) => {
    const res = workData.filter((element) => {
         return element.minionId === id;
      });

      return res.length ? res : null;
     
    
}

minionRouter.get('/minions/:id/work', (req,res,next) => {
    const elem = searchWorkByMinionId(req.params.id)
    if(elem != null) res.send(elem)
    else res.status(404).send()
})

minionRouter.post('/minions/:id/work', (req,res,next) => {
    const body = req.body;
    const newwork = method.addToDatabase('work', body);
    if(newwork != null) res.status(201).send(body);
    else res.status(404).send()

})

minionRouter.put('/minions/:id/work/:workId', (req,res,next) => {
    const minionId = Number(req.params.workId);
   const work = method.getFromDatabaseById('work', req.params.workId);
   if (isNaN(minionId) || work.minionId !== req.params.id) {
      res.status(400).send();
   } else {
      res.send(method.updateInstanceInDatabase('work', req.body));
   }
    
} )

minionRouter.delete('/minions/:id/work/:workid', (req,res,next) => {
    const del = method.deleteFromDatabasebyId('work', req.params.workid);
    if(del) res.status(204).send()
    else res.status(404).send()
})

module.exports = minionRouter