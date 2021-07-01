import mongoose from "mongoose"
import dotenv from "dotenv"
import products from "./data/products.js"
import users from "./data/users.js"
import Product from "./models/productModel.js"
import User from "./models/userModel.js"
import Order from "./models/orderModel.js"
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const insertedUsers = await User.insertMany(users)
        const adminUser = insertedUsers[0]._id

        const newProducts = products.map(p => ({...p, user: adminUser}))
        await Product.insertMany(newProducts)

        console.log("Data imported");
        process.exit()
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()        

        console.log("Data destroyed");
        process.exit()
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

if(process.argv[2] == "-d"){
    destroyData()
}else{
    importData()
}