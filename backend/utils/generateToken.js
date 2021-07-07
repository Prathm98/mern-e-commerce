import jwt from 'jsonwebtoken'

const generateToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRETE, {
        expiresIn: '1d'
    })
}

export default generateToken