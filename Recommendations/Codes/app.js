var express = require('express')
//, routes = require('./routes')
, neo4j = require('./routes/neo4j')
, bodyParser = require('body-parser')
, http = require('http')
, txUrl = 'http://192.168.99.100:7474/db/data/transaction/commit'
//var txUrl = 'http://192.168.99.100:7474/db/data/cypher';
var app = express()
app.set('port', 3000)
app.use(express.logger('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', function(req, res){
	res.writeHead(200, {'content-type' : 'application/json'})
	sayHello(req, res)
	
})
function sayHello(req, res){
	res.end('{"Salutation" : "Hi there"}')
}
app.post('/storeData', neo4j.storeData)
app.get('/suggestSimilarProducts', neo4j.suggestSimilarProducts)
app.get('/getProductCatalog', function(req, res){
	var data = '[{"title" : "Steve Madden","price" : "$118.00","stock" : "12", "description" : "Steve Madden Women Ecentrcq Slip-On Fashion Sneaker","categories" : "Shoes"},{"title" : "Steve Madden","price" : "$118.00","stock" : "12", "description" : "Steve Madden Women Ecentrcq Slip-On Fashion Sneaker","categories" : "Shoes"}]';
	res.writeHead(200, {'content-type' : 'application/json'})
	res.end(data)
})
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'))
})

// /db/data/cypher

// {
// 	"title" : "adidas Originals Women's Superstar W Fashion Sneaker",
// 	"price" : "$179.99",
// 	"stock" : "13",
// 	"description" : "Leather/Synthetic Rubber sole Retro-inspired sneaker featuring classic rubber shell toe Breathable mesh liner",
// 	"imageBin" : "This is just sample because I dont know what is imageBin",
// 	"imageUrl" : "https://slimages.macysassets.com/is/image/MCY/products/4/optimized/3982934_fpx.tif??op_sharpen=1&fit=fit,1&$filterlrg$&wid=1200&hei=1467",
// 	"categories" : "Shoes"
// }

// {
// 	"title" : "Steve Madden",
// 	"price" : "$118.00",
// 	"stock" : "12",
// 	"description" : "Steve Madden Women's Ecentrcq Slip-On Fashion Sneaker",
// 	"imageBin" : "This is just sample because I dont know what is imageBin",
// 	"imageUrl" : "https://images-na.ssl-images-amazon.com/images/I/81YSJCG3WqL._UL1500_.jpg",
// 	"categories" : "Shoes"
// }


