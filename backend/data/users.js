import bcryptjs from 'bcryptjs'

const users = [
    {
        name: "Admin",
        email: "admin@myshop.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "User",
        email: "user@myshop.com",
        password: bcryptjs.hashSync("123456", 10),
    },
    {
        name: "Test",
        email: "test@myshop.com",
        password: bcryptjs.hashSync("123456", 10),
    }
]

export default users