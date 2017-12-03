/**
  Loading all dependcies.
**/
var express         =	  require("express");
var redis           =	  require("redis");
var mysql           =	  require("mysql");
var session         =	  require('express-session');
var redisStore      =	  require('connect-redis')(session);
var bodyParser      =	  require('body-parser');
var cookieParser    =	  require('cookie-parser');
var path            =	  require("path");
var async           =	  require("async");
var client          =   redis.createClient(6379, '172.17.0.1');
var app             =	  express();
var router          =	  express.Router();

// Always use MySQL pooling.
// Helpful for multiple connections.

var pool	=	mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'cmpe281',
    debug    :  false
});

app.set('views', path.join(__dirname,'../','views'));
app.engine('html', require('ejs').renderFile);

// IMPORTANT
// Here we tell Express to use Redis as session store.
// We pass Redis credentials and port information.
// And express does the rest !

app.use(session({
		secret: 'ssshhhhh',
		store: new redisStore({ host: '127.0.0.1', port: 6380, client: client,ttl :  260000}),
		saveUninitialized: false,
		resave: false
}));
app.use(cookieParser("secretSign#143_!223"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// This is an important function.
// This function does the database handling task.
// We also use async here for control flow.

function handle_database(req,type,callback) {
	async.waterfall([
		function(callback) {
			pool.getConnection(function(err,connection){
				if(err) {
          // if there is error, stop right away.
          // This will stop the async code execution and goes to last function.
					callback(true);
				} else {
					
					callback(null,connection);
				}
			});
		},
		function(connection,callback) {
			var SQLquery;
			switch(type) {
				case "login" :
				SQLquery = "SELECT * from user_login WHERE user_email='"+req.body.user_email+"' AND `user_password`='"+req.body.user_password+"'";
				console.log("SQLQUERY: ", SQLquery);
				break;
        case "checkEmail" :
        SQLquery = "SELECT * from user_login WHERE user_email='"+req.body.user_email+"'";
        break;
				case "register" :
				SQLquery = "INSERT into user_login(user_email,user_password,user_name) VALUES ('"+req.body.user_email+"','"+req.body.user_password+"','"+req.body.user_name+"')";
				break;
				// case "addStatus" :
				// SQLquery = "INSERT into user_status(user_id,user_status) VALUES ("+req.session.key["user_id"]+",'"+req.body.status+"')";
				// break;
				// case "getStatus" :
				// SQLquery = "SELECT * FROM user_status WHERE user_id="+req.session.key["user_id"];
				// break;
				default :
				break;
			}
			callback(null,connection,SQLquery);
		},
		function(connection,SQLquery,callback) {
			connection.query(SQLquery,function(err,rows){
				console.log("rows: ", rows );
        connection.release();
				if(!err) {
					if(type === "login") {
						callback(rows.length === 0 ? false : rows[0]);}
					// } else if(type === "getStatus") {
          //   callback(rows.length === 0 ? false : rows);
					// }
					 else if(type === "checkEmail") {
            callback(rows.length === 0 ? false : true);
          }else {
						callback(false);
					}
				} else {
          // if there is error, stop right away.
          // This will stop the async code execution and goes to last function.
          callback(true);
        }
			});
		}
	],function(result){
    // This function gets call after every async task finished.
		if(typeof(result) === "boolean" && result === true) {
			callback(null);
		} else {
			callback(result);
		}
	});
}

/**
    --- Router Code begins here.
**/

router.get('/',function(req,res){
	res.render('index.html');
});
// after login
router.post('/login',function(req,res){
	handle_database(req,"login",function(response){
		console.log("Req contents: ", req.session.key);


		if(response === null) {
			res.json({"error" : "true","message" : "Database error occured"});
		} else {
			if(!response) {
				res.json({"error" : "true","message" : "Login failed ! Please register"});
			} else {
				console.log("Response: ", response)
				req.session.key = response;
				res.json({"error" : false,"message" : "Login success."});
			}
		}
	});
});
// is valid 
router.get('/home',function(req,res){
	if(req.session.key) {
		res.render("home.html",{ email : req.session.key["user_name"]});
	} else {
		res.redirect("/");
	}
});

// router.get("/fetchStatus",function(req,res){
//   if(req.session.key) {
//     handle_database(req,"getStatus",function(response){
//       if(!response) {
//         res.json({"error" : false, "message" : "There is no status to show."});
//       } else {
//         res.json({"error" : false, "message" : response});
//       }
//     });
//   } else {
//     res.json({"error" : true, "message" : "Please login first."});
//   }
// });

// router.post("/addStatus",function(req,res){
//     if(req.session.key) {
//       handle_database(req,"addStatus",function(response){
//         if(!response) {
//           res.json({"error" : false, "message" : "Status is added."});
//         } else {
//           res.json({"error" : false, "message" : "Error while adding Status"});
//         }
//       });
//     } else {
//       res.json({"error" : true, "message" : "Please login first."});
//     }
// });

router.post("/register",function(req,res){
    handle_database(req,"checkEmail",function(response){
      if(response === null) {
        res.json({"error" : true, "message" : "This email is already present"});
      } else {
        handle_database(req,"register",function(response){
          if(response === null) {
            res.json({"error" : true , "message" : "Error while adding user."});
          } else {
            res.json({"error" : false, "message" : "Registered successfully."});
          }
        });
      }
    });
});

router.get('/logout',function(req,res){
	if(req.session.key) {
    req.session.destroy(function(){
      res.redirect('index.html');
    });
	} else {
		res.redirect('/');
	}
});

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session.key);
  return next();
});

app.use('/',router);

app.listen(3000,function(){
	console.log("I am running at 3000");
});
