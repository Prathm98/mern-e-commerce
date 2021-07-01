import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.get("/", (req, res) => {
    res.send("API running")
})

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/products/:id", (req, res) => {
    var product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
})