const mongoose = require("mongoose");

// const { ObjectId, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
  },
  attributes: [
    {label:String, attribute:String},
  ],
  rating: {
    type: String,
  },
  specifications: [],
  
  images: []

});

mongoose.model("Product", ProductSchema, "products");
