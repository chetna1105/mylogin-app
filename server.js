const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const dashboard = require('./routes/api/dashboard');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
var dbName = 'nodejs';
const url = 'mongodb://localhost:27017';
const mongoUri = url + '/'+ dbName;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log ("connected to mongo db"))
.catch (err => console.log(err) );
//passport middleware
app.use(passport.initialize());
//passport
require('./config/passport')(passport);
app.get('/',(req,res) => res.send('Hello world!!!'));
//use routes
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/api/users',users);
app.use('/api/dashboard',dashboard);
const port = 5000;
app.listen(port , () => console.log(`Server running on port ${port}`));