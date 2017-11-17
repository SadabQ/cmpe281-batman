import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {urlSchema} from './urlSchema';

const UrlModel = mongoose.model('urlSchma', urlSchema);
var app = express();

mongoose.Promise = global.Promise;
var UrlMongoConnection = mongoose.connect('mongodb://localhost:27017/urldb', {
	useMongoClient: true
  });
/*var UrlMongoConnection = mongoose.connect('mongodb://utsavjain1408:Password1.@40.121.205.2056:27017/urldb', {
  useMongoClient: true
});*/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.route('/').get((req, res) => {
	res.json("Home Page");
})

app.route('/url').post((req,res) => {
	console.log('Url post ho raha hai');
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