const jwt = require('jsonwebtoken');

const Middleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    jwt.verify(token, "your_secret_key", (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid Token" });
        }
        req.user = user;
        next();
    });
};

module.exports = Middleware;
