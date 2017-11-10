var express = require('express');
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var client  = redis.createClient();
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));
app.post('/login',function(req,res){
    // when user login set the key to redis.
    req.session.key=req.body.email;
    res.end('done');
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000,function(){
    console.log("App Started on PORT 3000");
});

router.get('/',function(req,res){
    res.render('index.html');
});

router.post('/login',function(req,res){
    handle_database(req,"login",function(response){
        if(response === null) {
            res.json({"error" : "true","message" : "Database error occured"});
        } else {
            if(!response) {
              res.json({
                             "error" : "true",
                             "message" : "Login failed ! Please register"
                           });
            } else {
               req.session.key = response;
                   res.json({"error" : false,"message" : "Login success."});
            }
        }
    });
});
