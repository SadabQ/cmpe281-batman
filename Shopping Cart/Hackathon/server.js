import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {urlSchema} from './urlSchema';
var amqp = require('amqplib/callback_api');
const UrlModel = mongoose.model('urlSchema', urlSchema);
//bitnami@urlshorterMongodb:/opt/bitnami/mongodb$ mongo admin --username root -p^C
//mongo 40.121.205.206:27017/urldb  --username utsav -p
/*amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
	  var q = 'hello';
  
	  ch.assertQueue(q, {durable: false});
	  // Note: on Node 6 Buffer.from(msg) should be used
	  ch.sendToQueue(q, new Buffer('Hello World!'));
	  console.log(" [x] Sent 'Hello World!'");
	  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
	  ch.consume(q, function(msg) {
		console.log(" [x] Received %s", msg.content.toString());
	  }, {noAck: true});
	});
  });*/
var app = express();


/*var UrlMongoConnection = mongoose.connect('mongodb://localhost:27017/urldb', {
	useMongoClient: true
  });*/
var mongourl =  'mongodb://utsav:1234@40.121.205.206:27017/urldb'; 
var UrlMongoConnection = mongoose.connect(mongourl, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.route('/').get((req, res) => {
	res.json("Home Page");
})

app.route('/url').post((req,res) => {
	console.log('Url post ho raha hai');
	/*amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {
		  var q = 'hello';
		  var msg = 'Hello World!';
	  
		  ch.assertQueue(q, {durable: false});
		  // Note: on Node 6 Buffer.from(msg) should be used
		  ch.sendToQueue(q, new Buffer.from(msg));
		  console.log(" [x] Sent %s", msg);
		});
		setTimeout(function() { conn.close()}, 500);
	  });*/
	let newUrl = new UrlModel(req.body);
	newUrl.save((err, someUrl) => {
		if(err){
			res.send(`Url save me fat rahi hai!`)
		}
		console.log(`url post ho gaya! ${someUrl}`);
		let longId = someUrl._id;
		let shortId = longId.toString().slice(-8);
		console.log(`longId is ${longId} and the shortDI is ${shortId}`);
		someUrl.shortlink = shortId;
		UrlModel.findOneAndUpdate({_id:longId}, someUrl, {new:true}, (err, updatedUrl) => {
			if(err){
				res.send(`Update me fat rahi rai!`);
			}	
			console.log(updatedUrl);		
		})
		res.json(someUrl);
	})
})
app.route('/url/:shortUrl').get((req, res) => {
	console.log(`URL GET call hua hai`);
	/*amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
		var q = 'hello';
	
		ch.assertQueue(q, {durable: false});
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
		ch.consume(q, function(msg) {
		  console.log(" [x] Received %s", msg.content.toString());
		}, {noAck: true});
	  });
	});*/
	UrlModel.find({shortlink:req.params.shortUrl}, (err, somelongUrl) => {
		if(err){
			res.send(`Mongo GET me fat raha hai ${err}`);
		}
		res.json(somelongUrl);
	})
})
app.listen(3000, function(){
	console.log('server listening on port 3000 Jai Bhavani Ganpati bappa moriya')
})