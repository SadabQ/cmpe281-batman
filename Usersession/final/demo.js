//To access it in Node.js, you need to create Redis Client. Here is code snippet to do same.
var redis           =   require('redis');
var redisClient     =   redis.createClient({host : "35.164.76.43", port : 6379});
RedisSessions       =   require("redis-sessions");

rs = new RedisSessions();
rsapp = "myapp";
token1 = null;
user_ip = "192.168.22.58";



module.exports = {
    create : function (request, callback) {
        setTimeout( function(){
            rs.create({
                app: rsapp,
                id: request.login_id,
                ip: user_ip,
                ttl: 360000,
                d: {
                    login_id: request.login_id,
                    cart_id: request.cart_id,
                    quantity: request.quantity
                }
            },
