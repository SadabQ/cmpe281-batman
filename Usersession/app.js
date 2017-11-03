//To access it in Node.js, you need to create Redis Client. Here is code snippet to do same.
var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('ready',function() {
    console.log("Redis is ready");
   });
   
   redisClient.on('error',function() {
    console.log("Error in Redis");
   });

   redisClient.auth('password',function(err,reply) {
    console.log(reply);
   });

   redisClient.set("Session_id","123",function(err,reply) {
    console.log(err);
    console.log(reply);
   });

   redisClient.get("Session_id",function(err,reply){
       console.log(err);
       console.log(reply);
   });
