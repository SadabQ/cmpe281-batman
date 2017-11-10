var express = require('express')

var app = express()
app.use(express.logger('dev'))
app.get('/', function(req, res){
	res.end('Hi there!');
})
console.log( "Server running on Port 3000..." ) ;
app.listen(3000)
