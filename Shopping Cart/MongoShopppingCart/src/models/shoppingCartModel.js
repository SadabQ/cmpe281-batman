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
  }
});
