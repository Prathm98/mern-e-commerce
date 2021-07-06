import express from "express"
import mongoose from "mongoose"
import { authUser } from '../controller/usersController.js'

const router = express.Router()

router.post('/login', authUser)

export default router