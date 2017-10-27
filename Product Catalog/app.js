//Nodejs app to connect to MongoDb

//var http = require('http');
var express = require('express'),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient;
	
	
app = express();


//var server = http.createServer(function(request, response) {
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.end("Hello, World");
//});
MongoClient.connect('mongodb://localhost:27017/cmpe281', function(err,db){
	console.log("Successfully connected to MongoDB.");
}
		    
app.get('/', function(req,res) {
	res.send('Hello World');
});

app.use(function(req,res) {
	res.sendStatus(404);
});


var server = app.listen(8000, function(){
	var port = server.address().port;
	console.log('Server listening on port %s' , port);
});



//server.listen(8000);

//console.log("Server running at http://localhost:8000");

