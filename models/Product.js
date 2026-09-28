
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name of the product"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description of the product"]
    },
    price: {
        type: Number,
        required: true,
        min: [0.01, 'Price must be greater than 0']
    },
    category: {
        type: String,
        required: [true, "Please provide a category of the product"]
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    tags: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;