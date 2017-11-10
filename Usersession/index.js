/**
  Loading all dependencies.
**/
var express         =     require("express");
var redis           =     require("redis");
var session         =     require('express-session');
var redisStore      =     require('connect-redis')(session);
var bodyParser      =     require('body-parser');
var cookieParser    =     require('cookie-parser');
var path            =     require("path");
var async           =     require("async");
var client          =     redis.createClient();
var app             =     express();
var router          =     express.Router();

app.set('views', path.join(__dirname,'../','views'));
app.engine('html', require('ejs').renderFile);
