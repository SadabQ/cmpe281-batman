var r = require('request')
, dbUrl = 'http://192.168.99.100:7474/db/data/transaction/commit'
function cypher(query,params,res, callback) {
  r.post({uri:dbUrl,json:{statements:[{statement:query,parameters:params}]}},function(err,res){
  	if(err){
  		console.log("ERROR: " + err.message);
  	}else{
  		callback(err,res.body)
  	}
  })
  res.writeHead(200, {'content-type' : 'application/json'})
}
function getSimilarProducts(query,params,res, callback){
	r.post({uri:dbUrl,json:{statements:[{statement:query,parameters:params}]}},function(err,res){
  	if(err){
  		console.log("ERROR: " + err.message);
  	}else{
  		callback(err,res.body)
  	}
  })
  res.writeHead(200, {'content-type' : 'application/json'})
}
exports.getSimilarProducts = getSimilarProducts
exports.cypher = cypher
