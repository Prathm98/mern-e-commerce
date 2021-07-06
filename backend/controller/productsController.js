import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    var products = await Product.find()
    res.json(products)
})

// @desc    Fetch product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {   
    var product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        throw new Error("Product not found")
    }
})

export { getProducts, getProductById };
