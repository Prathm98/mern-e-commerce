import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Authetication of user and token issue
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{ 
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExisted = await User.findOne({email})

    if(userExisted){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name, email, password
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get User profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {  
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new error('User not found')
    }
})

export { authUser, getUserProfile, registerUser }