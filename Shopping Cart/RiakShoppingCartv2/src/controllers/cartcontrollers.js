//import config from '../../config';
import assert from 'assert';
import async from 'async';
import bodyParser from 'body-parser';
var riak = require('simpleriak').createClient({ 
    host: 'localhost',
    port: 8098, 
    bucket: 'test' 
});
var objtoadd = [];

export const viewAllCarts = (req, res) => {
    /*var obj = {
        "name":"Utsav Jain",
        "Address":"190 Ryland Street",
        "Phone" : "+1-669-204-9698"
    }
    console.log(`This is a cart update method.`);
    res.json(obj);*/
    riak.getKeys({bucket: 'cart' }, function (err, reply) {
        if(err){
            console.log('2 Error in getting cart'+ err);
           // res.send(err);
        }
        console.log('3'+reply.data); // returns { example: 'object' } 
        //objtoadd = reply.data;
        res.json(reply.data);
    });

}

export const vierCartbyID = (req, res) => {
    //var strvc = "view Cart by ID called"+req.body;
    let searchkey = req.params.email;
    riak.get({bucket: 'cart', key: searchkey }, function (err, reply) {
        console.log(reply.data); // returns { example: 'object' } 
        res.json(reply.data);
    });
    console.log('------------------------------------------------------------');
    //res.json(strvc);
}

export const updateCartbyID = (req, res) => {
    console.log(` updateCartbyID method called`);
    
    riak.get({bucket: 'cart', key: req.params.email }, function (err, reply) {
        if(err){
            console.log('Error in getting cart'+ err);
           // res.send(err);
        }
        console.log('3'+reply.data); // returns { example: 'object' } 
        objtoadd = reply.data;
        objtoadd.push(req.body);
        riak.put({bucket: 'cart', key: req.params.email, data: objtoadd}, function (err, reply) {
            console.log(err);
            res.json(reply.data);    
        });
        //console.log('4'+req.body);
        //res.json(reply.data);
    });
    console.log(req.params.email);
    
    
    //objtoadd.push(req.body);
   // res.json(objtoadd);
}