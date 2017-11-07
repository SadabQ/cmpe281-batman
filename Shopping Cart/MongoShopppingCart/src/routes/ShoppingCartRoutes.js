import { addNewProduct } from '../controllers/shoppingcartController';
const routes = (app) => {
  app.route('/product')
  .get((req, res, next) => {
    //middleware
    console.log(`Request from ${req.originalUrl}`)
    console.log(`Request from ${req.method}`)
    next();
  }, (req, res, next) => {
    res.send('GET request successfull!!!');
  })
  .post(addNewProduct);

  app.route('/product/:productID')
  .put((req, res)=>
  res.send('PUT request successfull!!'))

  .delete((req, res)=>
  res.send('DELETE request successfull!!'));
}

export default routes;
