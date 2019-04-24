const { verifyJWT } = require("../helper/jwt.js");
const { Answer, Question, Person } = require("../model/index.js");

const authentications = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).json({ error: "No token, authentications not allow" });
  } else {
    try {
      const decoded = verifyJWT(token);
      const isAuth = await Person.findOne({ _id: decoded._id });
      if (!isAuth) {
        res.status(401).json({ error: "you are not authentications" });
      } else {
        req.user = decoded;
        next();
      }
    } catch (e) {
      next(e);
    }
  }
};

module.exports = authentications;
