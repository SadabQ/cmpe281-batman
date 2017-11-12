//var http = require('http')
var r = require('request')
, neo4j = require('./neo4j')
, pcUrl = 'http://10.0.0.90:3000/getProductCatalog'
//this function is used to create a graph database from the available products fetched from ProductCatalog
exports.storeData = function(req, res){
	console.log(req.body)
	var query="CALL apoc.load.json('" + pcUrl + "')YIELD value as product MERGE(p:Product{_id : product._id, name : product.name, category: product.categories, imagePath : product.imagePath, price : product.price, stock : product.stock, description : product.description}) ON CREATE SET p.name = product.name WITH product, p FOREACH (category in product.categories | MERGE(cat:Category{name : category}) MERGE (p)-[:HAS_CATEGORY]->(cat) ) WITH product, p RETURN p"
	console.log(query)
	var params={limit: 10}
	//var cb=function(err,data) { res.end(JSON.stringify('success')) }
	neo4j.cypher(query, params,res, function(err, data){
		console.log(data)
		res.end(JSON.stringify(data))
		//res.end(data)
	})
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
	var category = req.body.category
	console.log(category)

	//var query = 'MATCH(p:Product)--(c:Category) WHERE c.name CONTAINS \'' + category + '\' RETURN p'
	var query = 'MATCH(p:Product{category : [' + category + ']}) RETURN p'
	//console.log(query)
	var params = {}
	neo4j.getSimilarProducts(query, params, res, function(err, data){
		console.log(data)
		res.end(JSON.stringify(data))
	})
	//res.writeHead(200, {'content-type' : 'application/json'})
	//res.end(JSON.stringify(req.body))
}
exports.suggestSimilarProducts = suggestSimilarProducts
