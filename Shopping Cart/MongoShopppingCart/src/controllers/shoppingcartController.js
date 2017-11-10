import mongoose from 'mongoose';
import { ProductSchema } from '../models/shoppingCartModel';

const Product = mongoose.model('Product', ProductSchema);
//const ShoppingCart = mongoose.model('ShoppingCart', ShopingCartSchema);
export const addNewProduct = (req,res) => {
  let newProduct = new Product(req.body);

  newProduct.save((err, product) => {
    if(err){
      res.send(err);
    }
    res.json(product);
  });
};

export const getProducts = (req, res) => {
  Product.find({}, (err, product) => {
    if(err){
      res.send(err);
    }
    res.json(product);
  });
};

export const getProductWithID = (req, res) => {
  Product.findOne({productID:req.params.productID}, (err, product) => {
    if(err){
      res.send(err);
    }
    console.log(req.params.productID);
    console.log(product);
    res.json(product);

  });
};

export const updateProduct = (req, res) => {
  Product.findOneAndUpdate({_id:req.params.productID}, req.body, {new:true}, (err, product) => {
    if(err){
      res.send(err);
    }
    res.json(product);
  });
};

export const deleteProduct = (req, res) => {
  Product.remove({productID:req.params.productID}, (err, product) =>{
    if(err){
      res.send(err);
        }
        res.json(product);
  });
};

export const getCartWithEmail = (req, res) => {
  Product.findOne({productID:req.params.productID}, (err, product) => {
    if(err){
      res.send(err);
    }
    console.log(req.params.productID);
    console.log(product);
    res.json(product);

  });
};
