const { tokenSecret } = require("../constant.js");
const jwt = require("jsonwebtoken");

function verifyMiddleware(req, res, next) {
  const token = req.header("auth_token");
  if (!token) {
    res.status(401).json({ message: "Access Denied" });
  }
  try {
    const verified = jwt.verify(token, tokenSecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = verifyMiddleware;
