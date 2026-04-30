import mongoose from "mongoose";

const optionSchema=new mongoose.Schema({
    label:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
    });

const productSchema=new mongoose.Schema({
    name:{
        type:String,  required: true
  },

  category: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  options: {
    type: [optionSchema],
    required: true
  }
});

const Product = mongoose.model("products", productSchema);
export default Product;