const router = require("express").Router();
const verifyMiddleware = require("./verifyToken.js");

//verify is middleware used to protect route
router.get("/", verifyMiddleware, (req, res) => {
  res.json({ posts: { title: "My first post!" } });
});

module.exports = router;
