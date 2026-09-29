
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// POST /api/products (Create a Product)
async function createProduct (req, res) {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch(error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

router.post("/", createProduct);



module.exports = router;

