//var http = require('http')
var r = require('request')
, dbUrl = 'http://192.168.99.100:7474/db/data/transaction/commit'

// Helper function for storData
function cypher(query,params,res, callback) {
  r.post({uri:dbUrl,json:{statements:[{statement:query,parameters:params}]}},function(err,res){
  	if(err){
  		console.log("ERROR: " + err.message);
  	}else{
  		callback(err,res.body)
  	}
  })
}
function getSimilarProducts(query,params,res, callback){
	r.post({uri:dbUrl,json:{statements:[{statement:query,parameters:params}]}},function(err,res){
  	if(err){
  		console.log("ERROR: " + err.message);
  	}else{
  		console.log(res.body.results.data)
  		//callback(err,res.body.results[0].data)
  		var result = res.body.results[0]
  		for(var c in result.data){
  			console.log(result.data[c].row)
  		}
  		callback(err, res.body.results[0])
  	}
  })
}
exports.getSimilarProducts = getSimilarProducts
exports.cypher = cypher