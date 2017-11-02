var Voldemort = require('voldemort');
// Create a client against local voldemort, with default store `products`.
Voldemort.bootstrap([{ host: 'localhost', port: 6666 }], { store: 'products' }, function (err, client) {
  // Retrieve 'product1' from 'products' store.
  client.get('product1', function (err, product) {
    console.log(product.value);   //Buffer value
    console.log(product.version); //VectorClock
  });
});
