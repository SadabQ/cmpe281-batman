'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateQty = exports.removeItemFromCart = exports.updateCartbyID = exports.vierCartbyID = exports.createNewCart = exports.viewAllCarts = undefined;

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import config from '../../config';
var Riak = require('basho-riak-client');

var riak = require('simpleriak').createClient({
    host: 'localhost',
    port: 8098,
    bucket: 'test'
});
var objtoadd = [];

var viewAllCarts = exports.viewAllCarts = function viewAllCarts(req, res) {
    riak.getKeys({ bucket: 'cart' }, function (err, reply) {
        if (err) {
            console.log('2 Error in getting cart' + err);
            // res.send(err);
        }
        console.log('3' + reply.data); // returns { example: 'object' } 
        //objtoadd = reply.data;
        res.json(reply.data);
    });
};
var createNewCart = exports.createNewCart = function createNewCart(req, res) {
    console.log('POST cart called');
    var client = _config2.default.createClient(function (e, c) {
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
            console.log(err);
            throw new Error(err);
        }
        console.log('Cart Created!!!');
        res.json(rslt);
        //async_cb();
    });
};

var vierCartbyID = exports.vierCartbyID = function vierCartbyID(req, res) {
    console.log('GET cart request successfull');
    try {
        var client = _config2.default.createClient(function (e, c) {
            if (e) {
                throw new Error(e);
            }
            console.log(' The Status of the node is ' + client.getRiakCluster());
            console.log('GET cart client creation successfull');
        });
        //console.log(`GET cart client creation successfull`);
        client.fetchValue({ bucket: 'cart', key: req.params.email, convertToJs: true }, function (err, rslt) {
            if (err) {
                console.log('Yaha pe error ' + err);
                throw new Error(err);
            } else {
                var riakObj = rslt.values.shift();
                console.log(rslt.values.value);
                //res.json(riakObj);
                if (riakObj != null) {
                    res.json(riakObj.value);
                } else {
                    res.json(null);
                }
            }
        });
    } catch (e) {
        console.log('Error');
        res.send('Fata!');
    } finally {
        console.log('Finally$%%%%%%%%%%%%%%%%$$$$$$');
        //res.send('Fata');
    }
};
var updateCartbyID = exports.updateCartbyID = function updateCartbyID(req, res) {
    console.log(' updateCartbyID method called');
    console.log('GET cart request successfull');
    try {
        var client = _config2.default.createClient(function (e, c) {
            if (e) {
                console.log('Error aaya!!');
                throw new Error(e);
            }
        });
    } catch (e) {
        console.log('Error aaya catch me!');
    } finally {
        console.log('finally block');
    }
    console.log('GET cart client creation successfull');
    client.fetchValue({ bucket: 'cart', key: req.params.email, convertToJs: true }, function (err, rslt) {
        if (err) {
            console.log(err);
            throw new Error(err);
        } else {
            var riakObj = rslt.values.shift();
            console.log(rslt.values.value);
            res.json(riakObj.value);
        }
    });

    //objtoadd.push(req.body);
    // res.json(objtoadd);
};

var removeItemFromCart = exports.removeItemFromCart = function removeItemFromCart(req, res) {
    riak.get({ bucket: 'cart', key: req.params.email }, function (err, reply) {
        if (err) {
            console.log('Error in getting cart' + err);
            // res.send(err);
        }
        //console.log('3'+reply.data); // returns { example: 'object' } 
        var objtoUpdate = reply.data;
        //let longWords = words.filter(word => word.length > 6);
        //const filteredCart = objtoUpdate.filter(item => item.productID != 352);
        console.log(req.body.productID);
        var filteredCart = objtoUpdate.filter(function (item) {
            return item.productID !== req.body.productID;
        });
        console.log(filteredCart);

        riak.put({ bucket: 'cart', key: req.params.email, data: filteredCart }, function (err, reply) {
            console.log(err);
            res.json(reply.data);
        });
    });
};

var updateQty = exports.updateQty = function updateQty(req, res) {
    riak.get({ bucket: 'cart', key: req.params.email }, function (err, reply) {
        if (err) {
            console.log('Error in getting cart' + err);
            // res.send(err);
        }
        //console.log('3'+reply.data); // returns { example: 'object' } 
        var objtoUpdate = reply.data;
        //let longWords = words.filter(word => word.length > 6);
        //        const filteredCart = objtoUpdate.filter(item => item.productID != 352);
        console.log(req.body.productID);
        //const filteredCart = objtoUpdate.filter(item => item.productID !== req.body.productID);
        ///console.log(filteredCart);

        var objIndex = objtoUpdate.findIndex(function (obj) {
            return obj.productID == req.body.productID;
        });
        objtoUpdate[objIndex].qty = req.body.qty;
        riak.put({ bucket: 'cart', key: req.params.email, data: objtoUpdate }, function (err, reply) {
            console.log(err);
            res.json(reply.data);
        });
    });
};