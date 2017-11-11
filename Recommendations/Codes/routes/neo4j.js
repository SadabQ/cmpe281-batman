//var http = require('http')
var r = require('request')
, dbUrl = 'http://192.168.99.100:7474/db/data/transaction/commit'


//this function is used to create a graph database from the available products fetched from ProductCatalog
exports.storeData = function(req, res){
	console.log(req.body)
	var query='CREATE (n)'
	var params={limit: 10}
	//var cb=function(err,data) { res.end(JSON.stringify(data)) }
	var cb=function(err,data) { res.end(JSON.stringify('success')) }
	cypher(query, params, cb, res)
}

// Helper function for storData
function cypher(query,params,cb, res) {
  r.post({uri:dbUrl,
          json:{statements:[{statement:query,parameters:params}]}},
         function(err,res) { cb(err,res.body)})
  res.writeHead(200, {'content-type' : 'application/json'})
}

//
exports.suggestSimilarProducts = function(req, res){
	
}
exports.importProductCatalog = function(req, res){
	var callback = function(err, data){res.end(data)}
	var pcUrl = 'http://10.0.0.90:3000/getProductCatalog'
	getProductCatalogData(pcUrl, res, callback)
}

function getProductCatalogData(pcUrl, res, callback){
	r.get(pcUrl, function(err, res){callback(err, res.body)})
	res.writeHead(200, {'content-type' : 'application/json'})
}
