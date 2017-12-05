var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: Number, required: true},
    imagePath: {type:String, required:true},
    name: {type:String, required:true},
    price: {type:Number, required: true, min:0},
    stock: {type:Number, default: 1},
    description: {type:String,required:true},
    categories: [{ type: String, index:true }]
}).index({
    "$**": "text"
});

module.exports = mongoose.model('Product', schema);
