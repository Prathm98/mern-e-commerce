import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Authetication of user and token issue
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && user.matchPassword(password)){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    }else{
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

export { authUser }