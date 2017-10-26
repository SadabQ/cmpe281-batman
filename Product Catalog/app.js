//Nodejs app to connect to MongoDb

var http = require('http');
var express = require('express'),
    cons = require('consolidate'),
    mongodb = require('mongodb');

var server = http.createServer(function(request, response) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end("Hello, World");
});

server.listen(8000);

console.log("Server running at http://localhost:8000");
