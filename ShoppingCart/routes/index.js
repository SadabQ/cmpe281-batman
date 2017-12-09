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
    var email_id ;
    if(req.user){
        email_id = req.user.email;
    }
    else if(req.cookies['sharedEmailId']){
        email_id = req.cookies['sharedEmailId'];
    }
    else{ email_id='NoUser'}

  Product.find(function (err,docs) {

    var chunkSize = 3;
    for(var i =0; i< docs.length; i +=chunkSize){
      productChunks.push(docs.slice(i,i + chunkSize));
    }
    //trending Products
    var productId = [];
    var hit = '/activity/useractivity/products?email=' + email_id;
     var options = {
       hostname: '52.27.83.151',
       port: 8080,
       path: hit,
       //path: '/activity/useractivity/trend',
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
                //var hit = '/activity/useractivity/products?email=' + email_id;

                var options = {
                   hostname: '52.27.83.151',
                   port: 8080,
                   path: '/activity/useractivity/trend',
                   //path: hit,
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
                                recentChunks = prodr;
                                //console.log(recentChunks);
                                //console.log(prodr);
                                // for(var i =0; i< prodr.length; i +=chunkSize){
                                //     recentChunks.push(prodr.slice(i,i + chunkSize));
                                // }
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
        res.send(docs);
    });
});


router.get('/product/:id', function(req, res, next) {
    var productId = req.params.id;
    var selectedProduct = null;
    var r = null;
    var productChunks = [];
    Product.findById(productId, function (err,docs) {
        if(err){
            console.log('error :' + err);
            return res.status(400).json({success: false, msg: 'Error fetching product from database'});
        }
        else{
            selectedProduct = docs;
            logProducts(selectedProduct,req,res,function(data){
                console.log("DATA IS " + data);
            });
            suggestProducts(selectedProduct,res,function(data){
                r = JSON.parse(data);

                if(data  == null){
                    res.render('shop/productdesc', {products: selectedProduct});
                }else{
                    var chunkSize = 3;
                    for(var i =0; i< r.products.length; i +=chunkSize){
                      productChunks.push(r.products.slice(i,i + chunkSize));
                    }
                    res.render('shop/productdesc', {products: selectedProduct, recommendedProducts: productChunks});
                }
           });
        }

    });
});
function suggestProducts(selectedProduct,res,callback){
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
  var email_id;
  if(req.user){
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

function logProducts(selectedProduct,req,res,callback){

    var email_id;
    if(req.user){
        email_id = req.user.email;
    }
    else if(req.cookies['sharedEmailId']){
        email_id = req.cookies['sharedEmailId'];
    }
    else{ email_id='NoUser'}

    var http = require("http");
    var options = {
      hostname: '52.27.83.151',
      port: 8080,
      path: '/activity/useractivity',
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
  	request.write('{ "user_id": "'+ email_id +'", "tags": "'+ selectedProduct.categories +'", "productid":"'+ selectedProduct._id +'", "timestamp": 1512621032979 }');
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

            //trending Productsn    
            var productId = [];
            var hit = '/activity/useractivity/products?email=' + email_id;
    
            var options = {
                hostname: '52.27.83.151',
                port: 8080,
                path: hit,
                //path: '/activity/useractivity/trend',
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
    
                    Product.find({$and : [{'_id': {$in: productId}}, {'categories': {$regex: category, $options: '-i'}}]},                   
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
                       hostname: '52.27.83.151',
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
                                recentProductId = p.id;
                                
                                Product.find({$and : [{'_id': {$in: recentProductId}}, {'categories': {$regex: category, $options: '-i'}}]},
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

            }
        });
});

router.get('/search/:text', function(req, res, next) {
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
            res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
        }
    });
});


router.get('/add-to-cart/:id',function (req,res,next) {
  var productId = req.params.id;
    var email_id;
    if(req.user){
        email_id = req.user.email;
    }
    else if(req.cookies['sharedEmailId']){
        email_id = req.cookies['sharedEmailId'];
    }
    else{ email_id='NoUser'}


  var emailId = '/cart/' +  email_id;
  var cart;

  var http = require("http");
  var options = {
    hostname: '13.56.77.198',
    port: 3000,
    path: emailId,
    method: 'GET'
  };

  var request = http.get(options, function(response) {

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  response.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    var p = JSON.parse(body);
    cart = new Cart(p ? p : {});

    Product.findById(productId, function (err,product) {
        if (err){
          return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        addCart(cart,req,res,function(data){
          console.log("DATA IS " + data);
      });

        res.redirect('/');
    });

  })
});

request.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});


});

router.get('/shopping-cart', function (req,res,next) {

  var email_id;
  if(req.user){
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
        method: 'GET'
  };
  var request = http.get(options, function(response) {
  var bodyChunks = [];
  response.on('data', function(chunk) {

    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    var p = JSON.parse(body);
    var cart = new Cart(p ? p : {});
    req.session.cart = cart;
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, email: email_id});
  })
});

request.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

});

router.get('/reduce/:id', function (req, res, next) {
    var productId = req.params.id;
    var email_id;

    if(req.user){
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
            method: 'GET'
    };

    var request = http.get(options, function(response) {
    var bodyChunks = [];
    response.on('data', function(chunk) {

      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      var p = JSON.parse(body);
      var cart = new Cart(p);

      cart.reduceByOne(productId);
      req.session.cart = cart;

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
  var email_id;
  if(req.user){
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
  request.write(JSON.stringify(cart));
  request.end();

}

router.get('/remove/:id', function (req, res, next) {
    var productId = req.params.id;
    var email_id;

    if(req.user){
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
          method: 'GET'
        };

        var request = http.get(options, function(response) {
        var bodyChunks = [];
        response.on('data', function(chunk) {

          bodyChunks.push(chunk);
        }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          var p = JSON.parse(body);
          var cart = new Cart(p);

          cart.removeItem(productId);
          req.session.cart = cart;

          updatesCart(req,cart);
 
        res.redirect('/shopping-cart');
        })
      });

      request.on('error', function(e) {
        console.log('ERROR: ' + e.message);
      });
});


router.get('/share/:email', function(req, res, next) {
    var sharedEmailId = req.params.email;

    res.cookie('sharedEmailId', sharedEmailId, { maxAge: 900000, httpOnly: true });

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

    var hit = '/activity/useractivity/products?email=' + sharedEmailId;
    var options = {
      hostname: '52.27.83.151',
      port: 8080,
      path: hit,
      //path: '/activity/useractivity/trend',
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
                   hostname: '52.27.83.151',
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
