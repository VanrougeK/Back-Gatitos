const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        return res.status(401).json({
            error: "Token requerido"
        })
    } try {
        const token = authHeader.startsWith("Bearer ")? authHeader.slice(7):authHeader
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch {
        res.status(401).json({error:"Token invalido"})
    }
}