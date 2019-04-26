const {
  Answer,
  Question,
  Person,
  Comment,
  Category
} = require("../model/index.js");

class AnswerService {
  static async create(req, res, next) {
    try {
      const goCreate = await Answer.create({
        user: req.user._id,
        fromquestion: req.body.fromquestion,
        answer: req.body.answer
      });
      res.status(201).json(goCreate);
    } catch (e) {
      next(e);
    }
  }
  static async destroy(req, res, next) {
    try {
      const destroyThis = await Answer.findByIdAndDelete(req.params.id);
      if (!destroyThis) {
        res.status(400).json({ error: `can't found ${req.params.id}` });
      } else {
        res.status(200).json(destroyThis);
      }
    } catch (e) {
      next(e);
    }
  }

  static async updated(req, res, next) {
    try {
      console.log(req.body, "iniii req.body");
      if (req.body.upvote) {
        const updateThis = await Answer.findOneAndUpdate(
          {
            _id: req.params.id
          },
          { $addToSet: { upvote: req.user._id } },
          { runValidators: true }
        );
        if (!updateThis) {
          res.status(400).json({ error: `can't found any` });
        } else {
          res.status(200).json(updateThis);
        }
      } else if (req.body.downvote) {
        const updateThis = await Answer.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { upvote: req.user._id } },
          { runValidators: true }
        );
        if (!updateThis) {
          res.status(400).json({ error: `can't found any` });
        } else {
          res.status(200).json(updateThis);
        }
      } else {
        if (req.body.flexible == "true") {
          const updateThis = await Answer.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            { runValidators: true }
          );
          if (!updateThis) {
            res.status(400).json({ error: `can't found any` });
          } else {
            res.status(200).json(updateThis);
          }
        } else {
          const updateThis = await Answer.findOneAndUpdate(
            { _id: req.params.id },
            {
              fromquestion: req.body.fromquestion,
              answer: req.body.answer,
              user: req.user._id
            },
            { runValidators: true }
          );
          if (!updateThis) {
            res.status(400).json({ error: `can't found any` });
          } else {
            res.status(200).json(updateThis);
          }
        }
      }
    } catch (e) {
      console.log(e, ";error nih");
      next(e);
    }
  }

  static async getOne(req, res, next) {
    try {
      const gettttt = await Answer.findOne({ _id: req.params.id }).populate(
        "fromquestion"
      );
      res.status(200).json(gettttt);
    } catch (e) {
      next(e);
    }
  }

  static async findPopulate(req, res, next) {
    try {
      const allPopulate = await Answer.find({}).populate("user");
      res.status(200).json(allPopulate);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AnswerService;
