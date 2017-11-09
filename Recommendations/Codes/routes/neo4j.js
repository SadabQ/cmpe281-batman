var http = require('http')
, r = require('request')
, txUrl = 'http://192.168.99.100:7474/db/data/transaction/commit'

exports.storeData = function(req, res){
	var query='MATCH (n) RETURN COUNT(n)'
	var params={limit: 10}
	var cb=function(err,data) { res.end(JSON.stringify(data)) }
	cypher(query, params, cb, res)
}
function cypher(query,params,cb, res) {
  r.post({uri:txUrl,
          json:{statements:[{statement:query,parameters:params}]}},
         function(err,res) { cb(err,res.body)})
  res.writeHead(200, {'content-type' : 'application/json'})
  //res.end(body)
  //res.end(cb(err,res.body))
}
