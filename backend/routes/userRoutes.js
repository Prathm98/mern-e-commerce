import express from "express"
import mongoose from "mongoose"
import { authUser, getUserProfile } from '../controller/usersController.js'
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router