'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cartcontrollers = require('../controllers/cartcontrollers');

var routes = function routes(app) {
    app.route('/cart') //give contents of all carts in the bucket
    .get(_cartcontrollers.viewAllCarts);

    app.route('/cart/:email').get(_cartcontrollers.vierCartbyID).post(_cartcontrollers.createNewCart).delete(_cartcontrollers.removeItemFromCart) //Not Required
    .put(_cartcontrollers.updateQty); //Not Required

    app.route('/carts/:email') //Not Required
    .post(_cartcontrollers.createNewCart) //Not Required
    .get(function (req, res) {
        console.log('Get is working'); //Not Required
        res.send('Kam ho gaya!');
    }); //Not Required
};

exports.default = routes;