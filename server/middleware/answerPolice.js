const { verifyJWT } = require("../helper/jwt.js");
const { Answer, Question, Person } = require("../model/index.js");

const AnswerPolicy = async (req, res, next) => {
  try {
    const checkOwnerQuestion = await Answer.findById(req.params.id);
    if (checkOwnerQuestion.user.toString() !== req.user._id) {
      res.status(400).json({
        warning: `you are not the owner of the answer , cant be deleted || edited`
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const AnswerPolicyVote = async (req, res, next) => {
  try {
    const checkOwnerQuestion = await Answer.findById(req.params.id);
    if (checkOwnerQuestion.user.toString() === req.user._id) {
      res.status(400).json({
        warning: `you are the owner of the answer , can't be voted`
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { AnswerPolicy, AnswerPolicyVote };
