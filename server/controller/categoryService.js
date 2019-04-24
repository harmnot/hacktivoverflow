const {
  Answer,
  Question,
  Person,
  Comment,
  Category
} = require("../model/index.js");

class CategoryService {
  static async findOne(req, res, next) {
    try {
      const find = await Category.find({ name: req.body.category }).populate(
        "questions"
      );
      res.status(200).json(find);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CategoryService;
