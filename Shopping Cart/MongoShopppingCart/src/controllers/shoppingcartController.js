import mongoose from 'mongoose';
import { ProductSchema } from '../models/shoppingCartModel';

const Product = mongoose.model('Product', ProductSchema);

export const addNewProduct = (req,res) => {
  let newProduct = new Product(req.body);

  newProduct.save((err, product) => {
    if(err){
      res.send(err);
    }
    res.json(product);
  });
};
