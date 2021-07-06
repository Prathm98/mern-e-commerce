import express from "express"
import mongoose from "mongoose"
import { getProducts, getProductById } from '../controller/productsController.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router