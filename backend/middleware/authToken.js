const jwt = require('jsonwebtoken')

exports.authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token"
        })
    }
}