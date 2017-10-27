var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Inport out model
var Vehicle = require('./app/models/vehicle.js');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

mongoose.connection.openUri('mongodb://localhost:27017/codealong');

//API Routes
var router = express.Router();

//routes will all be prefixed with /API

app.use('/api', router);
//MIDDLEWARE
//Middlewares can be useful for doing validation. We can log
//things from here or stop the request from continuing in the
//event that request is not safe.
//middleware is use for all requests
router.use(function(req,res,next){
  console.log('Kuch ho raha hai');
  next();
})
//Test route
router.get('/', function(req, res){
  res.json({message: 'Welcome to our API! Nameste!'});
});

router.route('/vehicle')
 .post(function(req,res){
   var vehicle = new Vehicle();
   vehicle.make = req.body.make;
   vehicle.model = req.body.model;
   vehicle.color = req.body.color;

   vehicle.save(function(err){
     if(err){
       res.send(err);
     }
     res.json({message: 'vehicle successfully entered'});
   });
 })

 .get(function(req,res){
   Vehicle.find(function(err, vehicle){
     if(err){
       res.send(err);
     }
     res.json(vehicle);
   });
 });

router.route('/vehicle/:vehicle_id')
  .get(function(req, res){
    Vehicle.findById(req.params.vehicle_id, function(err, vehicle){
      if(err){
        res.send(err);
      }
      res.json(vehicle);
    });
  });

  router.route('/vehicle/make/:make')
    .get(function(req,res){
      Vehicle.find({make:req.params.make}, function(err, vehicle){
        if(err){
          res.send(err);
        }
        res.json(vehicle);
      });
    });
    router.route('/vehicle/color/:color')
      .get(function(req,res) {
        Vehicle.find({color:req.params.color}, function(err,vehicl){
          if(err){
            res.send(err);
          }
          res.json(vehicle);
        });
      });

//Fire up the server
app.listen(port);

//Print message on the console
console.log('Server listining on the port'+port);
