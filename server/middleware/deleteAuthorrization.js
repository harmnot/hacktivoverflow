const { verifyJWT } = require("../helper/jwt.js");
const { Answer, Question, Person } = require("../model/index.js");

const Deleteauthorization = async (req, res, next) => {
  try {
    const checkOwnerQuestion = await Answer.findById(req.params.id);
    if (checkOwnerQuestion.user.toString() !== req.user._id) {
      res.status(400).json({
        error: `you can't do action this, unauthorization`
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = Deleteauthorization;
