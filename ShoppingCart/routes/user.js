/**
 * Created by Suchishree Jena on 11/12/2017.
 */

var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
//All the route included in router should be protected by csrf protection
router.use(csrfProtection);

router.get('/profile',isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

router.get('/logout',isLoggedIn, function(req, res, next) {
    req.logout();
    req.session.destroy(function(){
        res.redirect('/');
      });
});

router.use('/',notLoggedIn, function (req,res,next) {
    next();
});

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});
//Take the strategy as parameter
router.post('/signup', passport.authenticate('local.signup',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.post('/signin', passport.authenticate('local.signin',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash: true
}));

module.exports = router;

//function to protect the routes, that is users who are not logged in should not be allowed to access.
//use this middleware for all the routes you want to protect.
function isLoggedIn(req, res, next) {
    //user sessions are automatically managed by passport, if user is loggedin,(isAuthenticated() is set to true), then continue.
    if (req.isAuthenticated()){
        console.log("req: ", req.user._id);
        //this will tell paspport how to store user in a session.
        passport.serializeUser(function (user,done) {
            //it means when you want to store your user in a session , serialize it by id
            done(null,req.user._id);
});
        return next();
    }
    res.redirect('/');

}

function notLoggedIn(req, res, next) {
    //user sessions are automatically managed by passport, if user is loggedin,(isAuthenticated() is set to true), then continue.
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');

}



