//users part
require('./config/config');
require('./models/db');
require('./config/passportConfig');


/////////////////////////////////////////////////////////////////////
//users part
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

//in order to work with express
var app = express();

//middleware
app.use(bodyParser.json());
//in order to communicate between client and server side
app.use(cors());
app.use(passport.initialize()); 
app.use('/api', rtsIndex);

// Error handler
app.use((err, req, res, next) => {
    if(err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
    else 
    console.log(err);
});

//start server
app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.PORT}`)); 

/////////////////////////////////////////////////////////////////////////////////////////////
//notes part
