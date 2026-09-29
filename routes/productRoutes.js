
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

// GET /api/products/:id (Read a Single Product)
async function getProductById (req, res) {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch(error) {
        console.error(error);
        res.status(400).json({ message: "Invalid Product ID format" });
    }
}

router.get("/:id", getProductById);

//PUT /api/products/:id (Update a Product)
async function updateProduct (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if (!product) {
        return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch(error) {
        console.error(error);
        res.status(400).json({ message: error.message })
    }
}

router.put("/:id", updateProduct);


// DELETE /api/products/:id (Delete a Product)

async function deleteProduct (req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });    
        }

        res.json({ message: "Product deleted successfully!", product })
    } catch(error) {
        console.error(error);
        res.status(400).json({ message: error.message })
    }
}

router.delete("/:id", deleteProduct);

// GET /api/products (Read All Products with Advanced Querying)
async function getProducts(req, res) {
    try {
        const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

        // 1. Query Object
        const queryObj = {};

        if (category) {
            queryObj.category = category;
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            queryObj.price = {};
            if (minPrice !== undefined) queryObj.price.$gte = Number(minPrice);
            if (maxPrice !== undefined) queryObj.price.$lte = Number(maxPrice);
        }

        // 2.SortBY
        let sortOption = {};
        if (sortBy === "price_asc") {
            sortOption.price = 1;  
        } else if (sortBy === "price_desc") {
            sortOption.price = -1; 
        } else {
            sortOption.createdAt = -1; 
        }

        // 3. Page
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        const products = await Product.find(queryObj)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum);

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

router.get("/", getProducts);

module.exports = router;

