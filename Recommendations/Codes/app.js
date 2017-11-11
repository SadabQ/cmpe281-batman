var express = require('express')
//, routes = require('./routes')
, r = require('request')
, neo4j = require('./routes/neo4j')
, bodyParser = require('body-parser')
, http = require('http')
, txUrl = 'http://192.168.99.100:7474/db/data/transaction/commit'
, productCatalogURL = 'http://10.0.0.90:3000/getProductCatalog'
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
app.get('/importProductCatalog', neo4j.importProductCatalog)
app.get('/getProductCatalog', function(req, res){
	var data = '[{ "_id" : { "$oid" : "5a055b61289dfcf7ab4229ae" }, "imagePath": "https://s1.postimg.org/9rgb2jbadn/Bag1.jpg", "name":"DC Comics Batman with Logo Black Tactical Backpack", "price": 60, "stock": 100, "categories": ["bags","LaptopBag","black bag","BagPack"], "description": "Polyester/PU Blend, Measures Approx 19 x 17 x 7, Fits up to a 15inch laptop " }, { "_id" : { "$oid" : "5a055b61289" }, "imagePath": "https://s1.postimg.org/1osc9r3j3f/Bag2.jpg", "name":"Batman High Capacity LaptopBag", "price": 40, "stock": 100, "categories": ["bags","LaptopBag","black bag","BagPack"], "description": "Cool and creative design, Fits up to a 15inch laptop " }, { "_id" : { "$oid" : "5a055b61289dfcf7ab422e" }, "imagePath": "https://s1.postimg.org/67udcqc023/Bag3.jpg", "name":"YOURNELO Leisure Rucksack School Backpack Bookbag", "price": 30, "stock": 100, "categories": ["bags","School Bag","black bag","kids"], "description": "Perfect gift choice for your kids.You could also use it to travel.It is eyecatching" }]'
	res.writeHead(200, {'content-type' : 'application/json'})
	res.end(data)
})
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'))
})


