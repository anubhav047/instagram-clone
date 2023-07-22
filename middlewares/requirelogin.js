const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please Login first" });
  }
  try {
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json({ error: "You must have logged in" });
      }
      const { _id } = data;
      req.user=_id;
      next()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
