var express = require('express');
var router = express.Router();
var http = require('http');
var Cart = require('../models/cart');
var Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
    var trendingChunks = [];
    var productChunks = [];
    var recentChunks = [];

  //  console.log('passport session' + req.session.passport.user);

  console.log(req.user);

  var email_id ;
  if(req.user){
    console.log(req.user);
    email_id = req.user.email;
}
else if(req.cookies['sharedEmailId']){
    email_id = req.cookies['sharedEmailId'];
}
else{ email_id='NoUser'}

    // console.log('sharedEmailId ' + req.cookies['cookiename']);

    // console.log('userEmail ' + req.cookies['userEmail']);
  Product.find(function (err,docs) {

    var chunkSize = 3;
    for(var i =0; i< docs.length; i +=chunkSize){
      productChunks.push(docs.slice(i,i + chunkSize));
    }
    //trending Products
    var productId = [];

     var options = {
       hostname: 'ec2-34-214-59-222.us-west-2.compute.amazonaws.com',
       port: 8080,
       path: '/activity/useractivity/trend',
       method: 'GET'
     };
     var request = http.get(options, function(response) {

            // Buffer the body entirely for processing as a whole.
            var bodyChunks = [];
            response.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
            }).on('end',
            function() {
                var body = Buffer.concat(bodyChunks);
                var p = JSON.parse(body);
                productId = p.id;

                Product.find({
                    '_id': {$in: productId}
                },
                function (err,prod) {
                    var chunkSize = 3;
                    for(var i =0; i< prod.length; i +=chunkSize){
                        trendingChunks.push(prod.slice(i,i + chunkSize));
                    }
                });

                //Recently viewed Products
                var recentProductId = [];
                var hit = '/activity/useractivity/products?email=' + email_id;

                var options = {
                   hostname: 'ec2-34-214-59-222.us-west-2.compute.amazonaws.com',
                   port: 8080,
                   path: hit,
                   method: 'GET'
                };
                var request = http.get(options, function(response) {

                        // Buffer the body entirely for processing as a whole.
                        var bodyChunks = [];
                        response.on('data', function(chunk) {
                        // You can process streamed parts here...
                        bodyChunks.push(chunk);
                        }).on('end',
                        function() {
                            var body = Buffer.concat(bodyChunks);
                            var p = JSON.parse(body);
                            recentProductId = p.id;

                            Product.find({
                                '_id': {$in: recentProductId}
                            },
                            function (err,prodr) {
                                var chunkSize = 3;
                                for(var i =0; i< prodr.length; i +=chunkSize){
                                    recentChunks.push(prodr.slice(i,i + chunkSize));
                                }
                            });

                            res.render('shop/index', { title: 'Shopping Cart', products: productChunks , trendingp: trendingChunks, recentp: recentChunks});
                        })
                });
            })
        });
    });

});




router.get('/checkout', function(req,res){
    if(req.user){
        console.log(req.user);
        email_id = req.user.email;
    }
    else if(req.cookies['sharedEmailId']){
        email_id = req.cookies['sharedEmailId'];
    }
    else{ email_id='NoUser'}


     var cart = {};
     updatesCart(req,cart);
    
    res.render('shop/checkout', { title: 'Shopping Cart'});
});



router.get('/getAllProducts', function(req, res, next) {
    Product.find(function (err,docs) {
        //console.log(docs);
        res.send(docs);
    });
});


router.get('/product/:id', function(req, res, next) {
    var productId = req.params.id;
    var selectedProduct = null;
    var r = null;
    Product.findById(productId, function (err,docs) {
        if(err){
            console.log('error :' + err);
            return res.status(400).json({success: false, msg: 'Error fetching product from database'});
        }
        else{
            selectedProduct = docs;
            logProducts(selectedProduct,res,function(data){
                console.log("DATA IS " + data);
            });
            suggestProducts(selectedProduct,res,function(data){
                r = JSON.parse(data);
                if(data  == null){
                    res.render('shop/productdesc', {products: selectedProduct});
                }else{
                    console.log(selectedProduct);
                    console.log(r);
                    res.render('shop/productdesc', {products: selectedProduct, recommendedProducts: r});
                }
           });
        }

    });
});
function suggestProducts(selectedProduct,res,callback){
    //console.log("Inside callProducts Function");
    var http = require("http");
	var options = {
	  hostname: '35.165.88.214',
	  port: 3000,
	  path: '/suggestSimilarProducts',
	  method: 'POST',
	  headers: {
	      'Content-Type': 'application/json',
	  }
    };
    var request = http.request(options, function(response) {
         response.on('data', function (body) {
         //    console.log("I have found data.........")
         //  console.log('Body: ' + body)
           callback(body)
         });
       });
       request.on(  'error', function(e) {
        console.log('problem with request: ' + e.message);
      });
      request.write(JSON.stringify(selectedProduct))
      request.end();
}

function addCart(selectedProduct,req,res,callback){
  console.log("Inside addCart Function");
  var email_id;
  if(req.user){
      console.log(req.user);
      email_id = req.user.email;
  }
  else if(req.cookies['sharedEmailId']){
      email_id = req.cookies['sharedEmailId'];
  }
  else{ email_id='NoUser'}



    var emailId = '/cart/' +  email_id;
    var http = require("http");
    var options = {
    hostname: '13.56.77.198',
    port: 3000,
    path: emailId,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
  };

    var request = http.request(options, function(response) {
    response.setEncoding('utf8');
    response.on('data', function (body) {
    });
  });
  request.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  // write data to request body
  request.write(JSON.stringify(selectedProduct));
  request.end();
}

function logProducts(selectedProduct,res,callback){
    console.log("Inside callProducts Function");
    var http = require("http");
    var options = {
      hostname: 'ec2-34-214-59-222.us-west-2.compute.amazonaws.com',
      port: 8080,
      path: '/activity/useractivity',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
    };

    var request = http.request(options, function(response) {
  	 // console.log('Status: ' + res.statusCode);
  	 // console.log('Headers: ' + JSON.stringify(res.headers));
  	  response.setEncoding('utf8');
  	  response.on('data', function (body) {
  	    // console.log('Body: ' + body)
  	   // res.writeHead(200, {'content-type' : 'application/json'})
  	   // res.end(body)
  	  });
  	});
  	request.on('error', function(e) {
  	  console.log('problem with request: ' + e.message);
  	});
  	// write data to request body
  	request.write('{ "user_id": "test@gmail.com", "tags": "capp", "productid":'+ selectedProduct._id +', "timestamp": 1512621032979 }');
  	request.end();
}

//Search by Category
router.get('/searchCategory/:category', function(req, res, next) {
    var category = req.params.category;
    var trendingChunks = [];
    var productChunks = [];
    var recentChunks = [];

    var email_id;
    if(req.user){
        console.log(req.user);
        email_id = req.user.email;
    }
    else if(req.cookies['sharedEmailId']){
        email_id = req.cookies['sharedEmailId'];
    }
    else{ email_id='NoUser'}

    Product.find({ "categories": {$regex: category, $options: '-i'} })
        .exec(function (err,docs) {

            if(err){
                console.log('error :' + err);
                return res.status(400).json({success: false, msg: 'Error fetching product from database'});
            }
            else{
                var chunkSize = 3;
                for(var i =0; i< docs.length; i +=chunkSize){
                    productChunks.push(docs.slice(i,i + chunkSize));
                }
                //console.log(docs);
            //trending Products
            var productId = [];
    
            var options = {
                hostname: 'ec2-34-214-59-222.us-west-2.compute.amazonaws.com',
                port: 8080,
                path: '/activity/useractivity/trend',
                method: 'GET'
            };
            var request = http.get(options, function(response) {
    
                // Buffer the body entirely for processing as a whole.
                var bodyChunks = [];
                response.on('data', function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
                }).on('end',
                function() {
                    var body = Buffer.concat(bodyChunks);
                    var p = JSON.parse(body);
                    productId = p.id;
    
                    Product.find({
                        '_id': {$in: productId}
                    },
                    function (err,prod) {
                        var chunkSize = 3;
                        for(var i =0; i< prod.length; i +=chunkSize){
                            trendingChunks.push(prod.slice(i,i + chunkSize));
                        }
                    });
    
                    //Recently viewed Products
                    var recentProductId = [];
                    var hit = '/activity/useractivity/products?email=' + email_id;
    
                    var options = {
                       hostname: 'ec2-34-214-59-222.us-west-2.compute.amazonaws.com',
                       port: 8080,
                       path: hit,
                       method: 'GET'
                    };
                    var request = http.get(options, function(response) {
    
                            // Buffer the body entirely for processing as a whole.
                            var bodyChunks = [];
                            response.on('data', function(chunk) {
                            // You can process streamed parts here...
                            bodyChunks.push(chunk);
                            }).on('end',
                            function() {
                                var body = Buffer.concat(bodyChunks);
                                var p = JSON.parse(body);
                                recentProductId = p.id;
    
                                Product.find({
                                    '_id': {$in: recentProductId}
                                },
                                function (err,prodr) {
                                    var chunkSize = 3;
                                    for(var i =0; i< prodr.length; i +=chunkSize){
                                        recentChunks.push(prodr.slice(i,i + chunkSize));
                                    }
                                });
    
                                res.render('shop/index', { title: 'Shopping Cart', products: productChunks , trendingp: trendingChunks, recentp: recentChunks});
                            })
                    });
                })
            });

                //res.render('shop/index', { title: 'Shopping Cart', products: productChunks });

            }
        });
});

router.get('/search/:text', function(req, res, next) {
    console.log("*********In getProduct By name function ***********");
    var productName = req.params.text;
    var selectedProduct = null;
    Product.find({ "name": {$regex: productName, $options: '-i'} })
        .exec(function (err,docs) {

        if(err){
            console.log('error :' + err);
            return res.status(400).json({success: false, msg: 'Error fetching product from database'});
        }
        else{
            var productChunks = [];
            var chunkSize = 3;
            for(var i =0; i< docs.length; i +=chunkSize){
                productChunks.push(docs.slice(i,i + chunkSize));
            }
            console.log(docs);
            //selectedProduct = docs;
            //res.send(JSON.parse(JSON.stringify(docs)));
            res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
                //res.render('shop/productdesc', {products: selectedProduct });
        }
    });
});


router.get('/add-to-cart/:id',function (req,res,next) {
  var productId = req.params.id;
  console.log('Heloo from else reduce');
  var email_id;
  if(req.user){
    console.log(req.user);
    email_id = req.user.email;
}
else if(req.cookies['sharedEmailId']){
    email_id = req.cookies['sharedEmailId'];
}
else{ email_id='NoUser'}


  var emailId = '/cart/' +  email_id;

  console.log('add-to-cart emailId' + emailId);

  var cart;

  var http = require("http");
  var options = {
    hostname: '13.56.77.198',
    port: 3000,
    path: emailId,
    method: 'GET'
  };

  var request = http.get(options, function(response) {
//     localStorage.setItem("lastname", "Smith");


  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  response.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    // console.log('BODY: ' + body);
    var p = JSON.parse(body);
    cart = new Cart(p ? p : {});
    //console.log('BODY: ' + p);

    Product.findById(productId, function (err,product) {
        if (err){
          return res.redirect('/');
        }
        cart.add(product, product.id);

        addCart(cart,req,res,function(data){
          console.log("DATA IS " + data);
      });

      //  req.session.cart = cart;
    //    console.log(req.session.cart);
        res.redirect('/');
    });
  // res.send(p);

  })
});

request.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

//  console.log(req.session.cart);


});

router.get('/shopping-cart', function (req,res,next) {

  //var cart = new Cart(req.session.cart ? req.session.cart : {});
  var email_id;
  if(req.user){
    console.log(req.user);
    email_id = req.user.email;
}
else if(req.cookies['sharedEmailId']){
    email_id = req.cookies['sharedEmailId'];
}
else{ email_id='NoUser'}

  console.log('/shopping-cart email_id:' + email_id);
      var emailId = '/cart/' +  email_id;
//  var emailId = '/cart/' +  'test@gmail.com';

  var http = require("http");
  var options = {
    hostname: '13.56.77.198',
    port: 3000,
    path: emailId,
    method: 'GET'
  };
  console.log('Heloo der');
  var request = http.get(options, function(response) {
  var bodyChunks = [];
  response.on('data', function(chunk) {

    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
     // console.log('BODY: ' + body);
    var p = JSON.parse(body);
    // console.log('BODY: ' + p);
    //if(req.session.cart ? req.session.cart : {}
    var cart = new Cart(p ? p : {});
    req.session.cart = cart;
  // res.send(p);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
  })
});

request.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

});

router.get('/reduce/:id', function (req, res, next) {
    var productId = req.params.id;

    console.log('Heloo from else reduce');
  //  var cart = new Cart(req.session.cart ? req.session.cart : {});
    // var emailId = '/cart/' +  'test@gmail.com';
    var email_id;
    if(req.user){
        console.log(req.user);
        email_id = req.user.email;
    }
    else if(req.cookies['sharedEmailId']){
        email_id = req.cookies['sharedEmailId'];
    }
    else{ email_id='NoUser'}
    console.log('//reduce/:id email_id:' + email_id);
  //  var email_id = req.cookies['sharedEmailId']
        var emailId = '/cart/' +  email_id;
    var http = require("http");
    var options = {
      hostname: '13.56.77.198',
      port: 3000,
      path: emailId,
      method: 'GET'
    };
    console.log('Heloo der reduce');

    var request = http.get(options, function(response) {
    var bodyChunks = [];
    response.on('data', function(chunk) {

      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      // console.log('BODY: ' + body);
      var p = JSON.parse(body);
  //    console.log('BODY: ' + p);
      var cart = new Cart(p);
      console.log(productId);
      cart.reduceByOne(productId);
      console.log(cart);

    updatesCart(req,cart);
    res.redirect('/shopping-cart');
    })
  });

  request.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
});

function updatesCart(req,cart)
{
  console.log("Inside Update Function");
  var email_id;
  if(req.user){
    console.log(req.user);
    email_id = req.user.email;
}
else if(req.cookies['sharedEmailId']){
    email_id = req.cookies['sharedEmailId'];
}
else{ email_id='NoUser'}

   console.log('/updatesCart email_id:' + email_id);

      var emailId = '/cart/' +  email_id;
  //  var emailId = '/cart/' +  'test@gmail.com';
  var http = require("http");
  var options = {
    hostname: '13.56.77.198',
    port: 3000,
    path: emailId,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
  };

  var request = http.request(options, function(response) {
   // console.log('Status: ' + res.statusCode);
   // console.log('Headers: ' + JSON.stringify(res.headers));
    response.setEncoding('utf8');
    response.on('data', function (body) {
      console.log('Body: ' + body)
    //  res.writeHead(200, {'content-type' : 'application/json'})
    //  res.end(body)
    });
  });
  request.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  // write data to request body
  request.write(JSON.stringify(cart));
  request.end();

}

router.get('/remove/:id', function (req, res, next) {
    var productId = req.params.id;

  //    console.log(req.session.passport.user);
    var email_id;
    if(req.user){
        console.log(req.user);
        email_id = req.user.email;
    }
    else if(req.cookies['sharedEmailId']){
        email_id = req.cookies['sharedEmailId'];
    }
    else{ email_id='NoUser'}

      console.log('//remove email_id:' + email_id);

        var emailId = '/cart/' +  email_id;

        var http = require("http");
        var options = {
          hostname: '13.56.77.198',
          port: 3000,
          path: emailId,
          method: 'GET'
        };
        console.log('Heloo der reduce');

        var request = http.get(options, function(response) {
        var bodyChunks = [];
        response.on('data', function(chunk) {

          bodyChunks.push(chunk);
        }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          // console.log('BODY: ' + body);
          var p = JSON.parse(body);
      //    console.log('BODY: ' + p);
          var cart = new Cart(p);
          // console.log(productId);
          cart.removeItem(productId);
          // console.log(cart);

          updatesCart(req,cart);
        //  req.session.cart = cart;
        // res.send(p);
      //  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
      res.redirect('/shopping-cart');
        })
      });

      request.on('error', function(e) {
        console.log('ERROR: ' + e.message);
      });
    //res.redirect('/shopping-cart');
});


router.get('/share/:email', function(req, res, next) {
    var sharedEmailId = req.params.email;
    console.log(sharedEmailId);

     res.cookie('sharedEmailId', sharedEmailId, { maxAge: 900000, httpOnly: true });
    console.log('sharedEmailId ' + req.cookies['sharedEmailId']);
  //  console.log('sharedEmailId ' + res.;
    var trendingChunks = [];
    var productChunks = [];
    var recentChunks = [];
  Product.find(function (err,docs) {

    var chunkSize = 3;
    for(var i =0; i< docs.length; i +=chunkSize){
      productChunks.push(docs.slice(i,i + chunkSize));
    }
    //trending Products
    var productId = [];

     var options = {
       hostname: 'ec2-34-214-59-222.us-west-2.compute.amazonaws.com',
       port: 8080,
       path: '/activity/useractivity/trend',
       method: 'GET'
     };
     var request = http.get(options, function(response) {

            // Buffer the body entirely for processing as a whole.
            var bodyChunks = [];
            response.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
            }).on('end',
            function() {
                var body = Buffer.concat(bodyChunks);
                var p = JSON.parse(body);
                productId = p.id;

                Product.find({
                    '_id': {$in: productId}
                },
                function (err,prod) {
                    var chunkSize = 3;
                    for(var i =0; i< prod.length; i +=chunkSize){
                        trendingChunks.push(prod.slice(i,i + chunkSize));
                    }
                });

                //Recently viewed Products
                var recentProductId = [];
                var hit = '/activity/useractivity/products?email=' + sharedEmailId;

                var options = {
                   hostname: 'ec2-34-214-59-222.us-west-2.compute.amazonaws.com',
                   port: 8080,
                   path: hit,
                   method: 'GET'
                };
                var request = http.get(options, function(response) {

                        // Buffer the body entirely for processing as a whole.
                        var bodyChunks = [];
                        response.on('data', function(chunk) {
                        // You can process streamed parts here...
                        bodyChunks.push(chunk);
                        }).on('end',
                        function() {
                            var body = Buffer.concat(bodyChunks);
                            var p = JSON.parse(body);
                            recentProductId = p.id;

                            Product.find({
                                '_id': {$in: recentProductId}
                            },
                            function (err,prodr) {
                                var chunkSize = 3;
                                for(var i =0; i< prodr.length; i +=chunkSize){
                                    recentChunks.push(prodr.slice(i,i + chunkSize));
                                }
                            });

                            res.render('shop/index', { title: 'Shopping Cart', products: productChunks , trendingp: trendingChunks, recentp: recentChunks});
                        })
                });
            })
        });
    });

});

module.exports = router;
