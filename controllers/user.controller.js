//defining fnction for user registration/sign up
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

// const { Router } = require("express")

// register is name of functions with parameters request, response and next
module.exports.register = (req, res, next) =>{
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(!err)
            res.send(doc);
        else
        {
            if(err.code == 11000)
                res.status(422).send(['Duplicate email adress found']);
            else
                return next(err);   
        }
    });
}

// from passportConfig authenticate .... 
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication...... when its called to executes passport.use function
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

//req._id is stored/defined in jwtHelper.js
module.exports.read = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}