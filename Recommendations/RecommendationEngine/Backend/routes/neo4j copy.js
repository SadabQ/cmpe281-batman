//var http = require('http')
var r = require('request')
, dbUrl = 'http://192.168.99.100:7474/db/data/transaction/commit'
, pcUrl = 'http://10.0.0.90:3000/getProductCatalog'
//this function is used to create a graph database from the available products fetched from ProductCatalog
exports.storeData = function(req, res){
	console.log(req.body)
	var n = '(n)'
	var query="CALL apoc.load.json('" + pcUrl + "')YIELD value as product MERGE(p:Product{_id : product._id, imagePath : product.imagePath, name : product.name, price : product.price, stock : product.stock, description : product.description}) ON CREATE SET p.name = product.name WITH product, p FOREACH (category in product.categories | MERGE(cat:Category{name : category}) MERGE (p)-[:HAS_CATEGORY]->(cat) ) WITH product, p RETURN *"
	console.log(query)
	var params={limit: 10}
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

//Content Based recommendation, taking out the category from request body, querying the db to get products with same category and returning the product
// exports.suggestSimilarProducts = function(req, res){
// 	var category = req.body.category
// 	var query = "MATCH (p:Product)--(c:Category{c.name: 'bags'}) RETURN p"
// 	var params = {}
// 	res.writeHead(200, {'content-type' : 'application/json'})
// 	res.end(JSON.stringify(req.body))
// }
function suggestSimilarProducts(req, res){
	console.log(req.body)
	res.end(JSON.stringify(req.body))
}
exports.suggestSimilarProducts = suggestSimilarProducts