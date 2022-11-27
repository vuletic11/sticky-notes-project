const mongoose = require('mongoose');
 
// to connect // JSON.stingify for printing the proper error if the connection wasn't established
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err){console.log('MongoDB connection succeeded.');}
    else{console.log('Error in MongoDb connection: ' + JSON.stringify(err, undefined, 2));}
    });

require('./user.model');