const jwt = require("jsonwebtoken")
// require('dotenv').config()
jwtAuthMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        // console.log(req.header, 'and', req.header.Authorization)
        if (!authorization) { return res.status(401).json({ message: 'token not found' }) }
        const token = authorization.split(' ')[1]
        console.log(token)
        const user = jwt.verify(token, process.env.secretkey)
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }
        else {
            req.user = user
            next()
        }
    } catch (error) {
        console.log('error in jwtmiddleware')
        res.status(401).json({ message: 'Invalid token' })
    }
}
jwtgeneratetoken = (userData) => {
    token = jwt.sign(userData, process.env.secretkey)
    return token
}
module.exports = { jwtAuthMiddleware, jwtgeneratetoken }