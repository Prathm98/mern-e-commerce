import express from "express"
import mongoose from "mongoose"
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

router.get("/", asyncHandler(async (req, res) => {
    var products = await Product.find()
    res.json(products)
}))

router.get("/:id", asyncHandler(async (req, res) => {   
    var product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        throw new Error("Product not found")
    }
}))

export default router