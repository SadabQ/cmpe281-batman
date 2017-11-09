var express = require('express')
var r = require('request')
var http = require('http')
var txUrl = 'http://192.168.99.100:7474/db/data/transaction/commit';
//var txUrl = 'http://192.168.99.100:7474/db/data/cypher';
var app = express()
app.use(express.logger('dev'))
app.set('port', 3000)
app.get('/', function(req, res){
	res.writeHead(200, {'content-type' : 'text/plain'})
	sayHello(req, res)
	
})
function sayHello(req, res){
	res.end('Hi there')
}
app.get('/importpd', function(req, res){
	var query='MATCH (n) RETURN COUNT(n)'
	var params={limit: 10}
	var cb=function(err,data) { res.end(JSON.stringify(data)) }
	cypher(query, params, cb, res)

})
function cypher(query,params,cb, res) {
  r.post({uri:txUrl,
          json:{statements:[{statement:query,parameters:params}]}},
         function(err,res) { cb(err,res.body)})
  res.writeHead(200, {'content-type' : 'application/json'})
  //res.end(body)
  //res.end(cb(err,res.body))
}
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'))
})
