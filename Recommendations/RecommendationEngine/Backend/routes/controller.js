var r = require('request')
, neo4j = require('./neo4j')
, pcUrl = 'http://10.0.0.90:3000/getProductCatalog'


//this function is used to create a graph database from the available products fetched from ProductCatalog
exports.storeData = function(req, res){
	console.log(req.body)
	var query="CALL apoc.load.json('" + pcUrl + "')YIELD value as product MERGE(p:Product{_id : product._id, name : product.name, category: product.categories, imagePath : product.imagePath, price : product.price, stock : product.stock, description : product.description}) ON CREATE SET p.name = product.name WITH product, p FOREACH (category in product.categories | MERGE(cat:Category{name : category}) MERGE (p)-[:HAS_CATEGORY]->(cat) ) WITH product, p RETURN p"
	console.log(query)
	var params={limit: 10}
	neo4j.cypher(query, params,res, function(err, data){
		console.log(data)
		res.end(JSON.stringify(data))
	})
	res.writeHead(200, {'content-type' : 'application/json'})
}
function suggestSimilarProducts(req, res){
	var category = req.body.category
	var categories = "["
	var comma = ""
	for(var cat in category){
		categories += comma + "\'" +(category[cat]) + "\'"
		comma = ","
	}
	categories += "]"
	var query = 'MATCH(p:Product{category : ' + categories + '}) RETURN p'
	var params = {}
	neo4j.getSimilarProducts(query, params, res, function(err, data){
		res.end(JSON.stringify(data))
	})
	res.writeHead(200, {'content-type' : 'application/json'})
}
exports.suggestSimilarProducts = suggestSimilarProducts