import {
    viewAllCarts,
    vierCartbyID,
    updateCartbyID,
    removeItemFromCart,
    updateQty
} from '../controllers/cartcontrollers';

 const routes = (app) => {
    app.route('/cart')  //give contents of all carts in the bucket
    .get(viewAllCarts)

    app.route('/cart/:email')
    .get(vierCartbyID)
    .post(updateCartbyID)
    .delete(removeItemFromCart)
    .put(updateQty)

}


export default routes;