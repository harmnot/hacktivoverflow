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
      const goCreate = await Answer.create({ ...req.body });
      res.status(201).json(goCreate);
    } catch (e) {
      next(e);
    }
  }
  static async destroy(req, res, next) {
    try {
      const destroyThis = await Answer.findByIdAndDelet(req.params.id);
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