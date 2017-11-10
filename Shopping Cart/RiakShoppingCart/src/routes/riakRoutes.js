import {
    addToCart,
    viewCart,
    updateCart,
    pingRiak
} from '../controllers/riakControllers';

const routes = (app) => {
    app.route('/cart')
    .get(viewCart)
    .put(updateCart)
    .post(addToCart)

    app.route('/ping')
    .get(pingRiak)
    
};
export default routes;
