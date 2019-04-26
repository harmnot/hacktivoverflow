const { verifyJWT } = require("../helper/jwt.js");
const { Answer, Question, Person } = require("../model/index.js");

const authorization = async (req, res, next) => {
  try {
    const checkOwnerQuestion = await Question.findById(req.params.id);
    if (checkOwnerQuestion.user.toString() === req.user._id) {
      res.status(400).json({
        error: `you are the owner of the question, can't vote itself`
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
