const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: "Authentication token malformed" });
    }

    jwt.verify(token, "jwttoken", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user; // Attach decoded user information to the request
        console.log("Decoded user:", user);
        next(); // Pass control to the next middleware
    });
};

module.exports = authenticateToken;
