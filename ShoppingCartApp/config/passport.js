/**
 * Created by Suchishree Jena on 11/12/2017.
 */
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//this will tell paspport how to store user in a session.
passport.serializeUser(function (user,done) {
    //it means when you want to store your user in a session , serialize it by id
   done(null,user.id);
});

passport.deserializeUser(function (id,done) {
    //it means in the mongo db findbyid , this allows to store the id in the session and deserialize it by id and retrieve the user whenever we want
    User.findById(id,function (err,user) {
        done(err,user);
    });
});
//signup strategy, it will be used when we create a new user.
//LocalStrategy() constructor takes two arguments, first is the configuration in form of js object, second is the callback
//configuration is to tell the local passport package that my username field is email in my case and my password is password and then pass the request to callback
passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
    //done is the var to tell the passport everything is done and working
},function (req,email,password,done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    //use the user model to find the user in mongodb and check if user already exist by email
    User.findOne({'email': email},function (err, user) {
        //if error, return done with that error
        if(err){
            return done(err);
        }
        //If i dont get an error but i find the user then return done with no errors , false to tell that there was no error but it was not successful either, so pass the 3rd arg a message
        if(user){
            return done(null, false,{message:'Email is already in use'});
        }
        //if everything goes well, create a new user
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));
//Local Strategy for signin
passport.use('local.signin',new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
    //done is the var to tell the passport everything is done and working
},function (req,email,password,done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    //use the user model to find the user in mongodb and check if user already exist by email
    User.findOne({'email': email},function (err, user) {
        //if error, return done with that error
        if(err){
            return done(err);
        }
        //If i dont get an error but i find the user then return done with no errors , false to tell that there was no error but it was not successful either, so pass the 3rd arg a message
        if(!user){
            return done(null, false,{message:'No user found.'});
        }
        if(!user.validPassword(password)){
            return done(null, false,{message:'Wrong Password'});
        }
        return done(null, user);
    });
}));