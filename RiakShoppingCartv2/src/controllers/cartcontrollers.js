//import config from '../../config';
import  config from '../../config';
import assert from 'assert';
import async from 'async';
import bodyParser from 'body-parser';
var Riak = require('basho-riak-client');

var riak = require('simpleriak').createClient({ 
    host: 'localhost',
    port: 8098, 
    bucket: 'test' 
});
var objtoadd = [];

export const viewAllCarts = (req, res) => {
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
export const createNewCart = (req,res) =>{
    console.log(`POST cart called`);
    var client = config.createClient(function (e, c) {
        if (e) {
            throw new Error(e);
        }
     });
    var riakObj = new Riak.Commands.KV.RiakObject();
    riakObj.setContentType('application/json');
    riakObj.setValue(req.body);
    client.storeValue({
        bucket: 'cart', key: req.params.email,
        value: riakObj
    }, function (err, rslt) {
        if (err) {
            console.log(err)
            throw new Error(err);
        }
        console.log(`Cart Created!!!`);
        res.json(rslt);
        //async_cb();
    })
}

export const vierCartbyID = (req, res) => {
    console.log(`GET cart request successfull`);
    try{
    var client = config.createClient(function (e, c) {
       if (e) {
           throw new Error(e);
       }
       console.log(` The Status of the node is ${client.getRiakCluster()}`);
       console.log(`GET cart client creation successfull`);
    });
  //console.log(`GET cart client creation successfull`);
   client.fetchValue({ bucket: 'cart', key: req.params.email, convertToJs: true },
   function (err, rslt) {
       if (err) {
           console.log(`Yaha pe error ${err}`);
           throw new Error(err);
       } else {
           var riakObj = rslt.values.shift();
           console.log(rslt.values.value);
           //res.json(riakObj);
           if(riakObj!=null)
           { 
               res.json(riakObj.value);
            }
            else{
                res.json(null);
            }

       }
   }
   );}
   catch(e){
       console.log(`Error`);
       res.send('Fata!');
   }
   finally{
       console.log(`Finally$%%%%%%%%%%%%%%%%$$$$$$`)
       res.send('Fata')
   }
};
export const updateCartbyID = (req, res) => {
    console.log(` updateCartbyID method called`);
    console.log(`GET cart request successfull`);
    try{
    var client = config.createClient(function (e, c) {
        if (e) {
            console.log(`Error aaya!!`);
            throw new Error(e);
        }
     });
    }
    catch(e){
        console.log(`Error aaya catch me!`);
    }
    finally{
        console.log(`finally block`);
    }
    console.log(`GET cart client creation successfull`);
    client.fetchValue({ bucket: 'cart', key: req.params.email, convertToJs: true },
    function (err, rslt) {
        if (err) {
            console.log(err);
            throw new Error(err);
        } else {
            var riakObj = rslt.values.shift();
            console.log(rslt.values.value);
            res.json((riakObj.value));
        }
    }
    );
    
    
    //objtoadd.push(req.body);
   // res.json(objtoadd);
}


export const removeItemFromCart = (req,res) => {
    riak.get({bucket: 'cart', key: req.params.email }, function (err, reply) {
        if(err){
            console.log('Error in getting cart'+ err);
           // res.send(err);
        }
        //console.log('3'+reply.data); // returns { example: 'object' } 
        var objtoUpdate = reply.data;
        //let longWords = words.filter(word => word.length > 6);
        //const filteredCart = objtoUpdate.filter(item => item.productID != 352);
        console.log(req.body.productID);
        const filteredCart = objtoUpdate.filter(item => item.productID !== req.body.productID);
        console.log(filteredCart);
        
        riak.put({bucket: 'cart', key: req.params.email, data: filteredCart}, function (err, reply) {
            console.log(err);
            res.json(reply.data);    
        });
    });
}

export const updateQty = (req, res) => {
    riak.get({bucket: 'cart', key: req.params.email }, function (err, reply) {
        if(err){
            console.log('Error in getting cart'+ err);
           // res.send(err);
        }
        //console.log('3'+reply.data); // returns { example: 'object' } 
        var objtoUpdate = reply.data;
        //let longWords = words.filter(word => word.length > 6);
//        const filteredCart = objtoUpdate.filter(item => item.productID != 352);
        console.log(req.body.productID);
        //const filteredCart = objtoUpdate.filter(item => item.productID !== req.body.productID);
        ///console.log(filteredCart);
        
        var objIndex = objtoUpdate.findIndex((obj => obj.productID == req.body.productID));
        objtoUpdate[objIndex].qty = req.body.qty; 
        riak.put({bucket: 'cart', key: req.params.email, data: objtoUpdate}, function (err, reply) {
            console.log(err);
            res.json(reply.data);    
        });
    });
}