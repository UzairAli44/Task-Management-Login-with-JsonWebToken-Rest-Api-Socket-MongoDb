const jwtToken = require('jsonwebtoken');

function AuhthMiddleware(req, res, next) {

    console.log("Auth middleware");
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    // if (token !== "valid-token") {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    jwtToken.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        next();

    });
    
}

module.exports = AuhthMiddleware;