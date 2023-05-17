//load express
const express = require('express')
//instantiate express
const app = express()
//instantiate port
const port = 3000
//require models
const Log = require('./models/logs')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config()//add.env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});
//data

//midware
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());
//Routes

//Index
app.get('/logs', (req, res)=>{
    Log.find({}, (error, allLogs)=>{
        res.render('Index', {
            logs: allLogs
        });
    });
});
//New
app.get('/logs/new', (req, res) => {
    res.render('New');
});
//Delete
app.delete('/logs/:id', (req, res)=>{
    Log.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/logs');//redirect back to logs index
    });
});
//Update
app.put('/logs/:id', (req, res)=>{
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Log.findByIdAndUpdate(req.params.id, req.body, (err, updatedLog)=>{
       console.log(updatedLog)
        res.redirect(`/logs/${req.params.id}`);
    });
});
//Create
app.post('/logs/', (req, res)=>{
    if(req.body.shipIsBroken === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }
    Log.create(req.body, (error, createdLog)=>{
        res.redirect('/logs');
    });
});
//Edit
app.get('/logs/:id/edit', (req, res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{ //find the log
      if(!err){
        res.render(
    		  'Edit',
    		{
    			log: foundLog //pass in the found log so we can prefill the form
    		}
    	);
    } else {
      res.send({ msg: err.message })
    }
    });
});
//Show
app.get('/logs/:id', (req, res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{
        res.render('Show', {
            log:foundLog
        });
    });
});



app.listen(port, () => {
    console.log(`Server is listening on, ${port}`)
})
