const {
  Answer,
  Question,
  Person,
  Comment,
  Category
} = require("../model/index.js");

class CommentService {
  static async create(req, res, next) {
    try {
      const createComent = await Comment.create({
        user: req.user._id,
        comment: req.body.comment
      });
      res.status(200).json(createComent);
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const createUpdate = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      res.status(201).json(createUpdate);
    } catch (e) {
      next(e);
    }
  }

  static async destroy(req, res, next) {
    try {
      const goDelete = await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json(goDelete);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CommentService;
