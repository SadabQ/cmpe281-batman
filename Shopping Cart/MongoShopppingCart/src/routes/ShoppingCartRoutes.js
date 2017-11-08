import {
  addNewProduct,
  getProducts,
  getProductWithID,
  updateProduct,
  deleteProduct,
  getCartWithEmail,
  updateCartWithEmail,
  deleteCartWithEmail
 } from '../controllers/shoppingcartController';
const routes = (app) => {
  app.route('/product')
  .get((req, res, next) => {
    //middleware
    console.log(`Request from ${req.originalUrl}`)
    console.log(`Request from ${req.method}`)
    next();
  }, getProducts)

  //POST Endpoint
  .post(addNewProduct);

  app.route('/product/:productID')
  .get(getProductWithID)

  .put(updateProduct)

  .delete(deleteProduct);
}
  /*app.route('shoppingCart/:email')
  .get(getCartWithEmail)

  .put(updateCartWithEmail)

  .delete(deleteCartWithEmail);
}
*/
export default routes;
