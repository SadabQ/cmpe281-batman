import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export  const ProductSchema = new Schema({
  productID:{
    type:Number,
    required: 'Enter Product ID',
    default: Date.now
  },
  productName:{
    type:String
  },
  companyName:{
    type:String
  },
  size:{
    type:Number
  },
  unit:{
    type:String
  },
  cost:
  {
    type:Number
  },
  stock:{
    type:Number
  },
  description:{
    type:String
  },
  imageURL:{
    type:String
  }
});

/*export const ShopingCartSchema = new Schema({
  email:{
      type:Number
  },
  productList:{
    type:String,
    default : ""
  }
});*/
