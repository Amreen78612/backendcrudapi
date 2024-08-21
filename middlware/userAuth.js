
let jwt = require("jsonwebtoken")
const secretkey = "token"
const User = require('../models/User');
exports.checkauth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")
        const secretkey = "token"
        let decode = jwt.verify(token[1], secretkey)
        if (decode) {
            req.token = token[1]
            next();
        } else {
            return res.status(401).json({
                message: "Invalid or expire token provided",
                succes: false
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expire token provided",
            succes: false,
            error: error
        })
    }
}


// Middleware to verify JWT token
exports.getLogedInUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token.split(' ')[1], secretkey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.profile = decoded;
        next();
    });


}






