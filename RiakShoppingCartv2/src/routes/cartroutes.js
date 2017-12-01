import {
    viewAllCarts,
    vierCartbyID,
    updateCartbyID,
    removeItemFromCart,
    updateQty,
    createNewCart
} from '../controllers/cartcontrollers';

 const routes = (app) => {
    app.route('/cart')  //give contents of all carts in the bucket
    .get(viewAllCarts)

    app.route('/cart/:email')
    .get(vierCartbyID)
    .post(createNewCart)
    .delete(removeItemFromCart)//Not Required
    .put(updateQty)//Not Required

    app.route('/carts/:email')//Not Required
    .post(createNewCart)//Not Required
    .get((req, res)=>{
        console.log(`Get is working`)//Not Required
        res.send(`Kam ho gaya!`)
    })//Not Required

}


export default routes;