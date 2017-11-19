var express = require('express')
//, routes = require('./routes')
, r = require('request')
, controller = require('./routes/controller')
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
app.post('/storeData', controller.storeData)
app.post('/suggestSimilarProducts', controller.suggestSimilarProducts)
app.get('/getProductCatalog', function(req, res){
	var data ='[ { "_id" : 123132, "imagePath": "https://s1.postimg.org/9rgb2jbadn/Bag1.jpg", "name":"DC Comics Batman with Logo Black Tactical Backpack", "price": 60, "stock": 100, "categories": ["bags","LaptopBag","black bag","BagPack"], "description": "Polyester/PU Blend, Measures Approx 19 x 17 x 7, Fits up to a 15inch laptop " },\
				 { "_id" : 123, "imagePath": "https://s1.postimg.org/1osc9r3j3f/Bag2.jpg", "name":"Batman High Capacity LaptopBag", "price": 40, "stock": 100, "categories": ["bags","LaptopBag","black bag","BagPack"], "description": "Cool and creative design, Fits up to a 15inch laptop " },\
				 { "_id" : 123897, "imagePath": "https://s1.postimg.org/60r5han2bf/Bag7.jpg", "name":"Laptop black Backpack", "price": 53, "stock": 100, "categories": ["bags","LaptopBag","black bag"], "description": "Size: 11.8inch L x 4.7inch W x 16.5inch H Laptop bagpack" },\
				 { "_id" : 6786, "imagePath": "https://s1.postimg.org/1vvk56rlyz/Bag8.jpg", "name":"The Dark Knight Batman Logo Laptop Messenger Bag Daypack Stone Washed & Black", "price": 35, "stock": 100, "categories": ["bags","Messenger Bag","black bag","Women"], "description": "Contains small hang loop for locker or closet hanging." },\
				 { "_id" : 343, "imagePath": "https://s1.postimg.org/8aa60s8fxn/Bag9.jpg", "name":"Batman Symbol Logo Tote/Messenger Bag", "price": 49, "stock": 100, "categories": ["bags","Sling Bag","black bag","Women"], "description": "Better Built Messenger bags are built to last." },\
				 { "_id" : 67567, "imagePath": "https://s1.postimg.org/8oglrnhlnv/Bag10.jpg", "name":"Travel Backpack", "price": 65, "stock": 100, "categories": ["bags","Travel Bag","black bag","Men","Women"], "description": "Holds a lot more than just your laptop" },\
				 { "_id" : 9089, "imagePath": "https://s1.postimg.org/1l8qc1fduj/Bag11.jpg", "name":"Batman Logo Retro Comic Shoulder Bag", "price": 48, "stock": 100, "categories": ["bags","Sling Bag","black bag","Women"], "description": "This Beautiful bag was created using Batman designs on black cotton fabric." },\
				 { "_id" : 5675, "imagePath": "https://s1.postimg.org/2h57rhmpez/Bag12.jpg", "name":"Batman Symbol Logo Graphic Messenger Bag", "price": 26, "stock": 100, "categories": ["bags","Sling Bag","black bag","Women"], "description": "A versatile cotton canvas messenger bag with many uses. It works well as a school bag, travel carry-all, or even a diaper bag. Spacious and comfortable to carry with two inside pockets, two outside pockets, and 2\' wide adjustable shoulder strap with Brass hardware." },\
				 { "_id" : 87678686, "imagePath": "https://s1.postimg.org/3noj03djgb/Bag13.jpg", "name":"DC Comics Batman Black Backpack with Black Bat Logo", "price": 56, "stock": 100, "categories": ["bags","Backpack","black bag","Women","Men"], "description": "Black messenger bag from DC Comics featuring a large rubber Batman logo patch and ballistic nylon details on the front flap." },\
				 { "_id" : 123123, "imagePath": "https://s1.postimg.org/1hp4ebjqjf/Bag14.jpg", "name":"Official DC Comics Distressed Batman Classic Logo Street Messenger Sling Bag - Black and Yellow", "price": 62, "stock": 100, "categories": ["bags","Sling Bag","black bag","Women"], "description": "Approximately 14inch long (not including length of strap) and 14.5inch wide" },\
				 { "_id" : 3343224, "imagePath": "https://s1.postimg.org/2h57rhoukr/Bag15.jpg", "name":"Batman Symbol Logo Graphic Messenger Bag", "price": 34, "stock": 100, "categories": ["bags","Sling Bag","black bag","Women"], "description": "Made from 100% high quality materials" },\
				 { "_id" : 43424, "imagePath": "https://s1.postimg.org/6wnmwqzbcr/Bag16.jpg", "name":"DC Comics Batman Envelope Purse, Clutch, Chain Strap", "price": 24, "stock": 100, "categories": ["bags","Sling Bag","Golden black bag","Women"], "description": "Holds your personal belongings in a bag made of nice fabric materials. Has a graphic design on the front of the bag. Be the envy of your friends." },\
				 { "_id" : 5676575767, "imagePath": "https://s1.postimg.org/7sk4c79my3/Bag17.jpg", "name":"Batman Golden Bag", "price": 34, "stock": 100, "categories": ["bags","Sling Bag","Golden bag","Women"], "description": "Very nice for those Batman Or Comic Fans. Ladies clutch wallet." } ]'
	
	res.writeHead(200, {'content-type' : 'application/json'})
	res.end(data)
})
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'))
})
