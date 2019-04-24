const {
  Answer,
  Question,
  Person,
  Comment,
  Category
} = require("../model/index.js");

/**
 * dynamic search mongoose
 * { 'username' : { '$regex' : req.body.keyWord, '$options' : 'i' } }
 * {name: /peter/i}
 * { "name" : { $regex: /Ghost/, $options: 'i' } }
 * { '$addToSet': { 'article': data } }
 * Model.insertMany(array)
 */

class QuestionService {
  static async add(req, res, next) {
    try {
      if (req.body.categories) {
        const generateQuestion = await Question.create({
          user: req.user._id,
          title: req.body.title,
          content: req.body.content
        });

        const setCategories = await Question.update(
          { _id: generateQuestion },
          { $addToSet: { categories: req.body.categories } }
        );

        let categories = req.body.categories;
        let categorieReadyToadd = [];

        // make sure category to be unique
        for await (let categorie of categories) {
          const findFirst = await Category.findOne({ name: categorie });
          if (!findFirst) {
            categorieReadyToadd.push({
              name: categorie,
              questions: generateQuestion._id
            });
          }
        }

        const createCatergory = await Category.insertMany(categorieReadyToadd);

        res.status(201).json({
          questions: [generateQuestion, setCategories],
          categories: createCatergory
        });
      } else {
        const goCreateQuestions = await Question.create({
          user: req.user._id,
          title: req.body.title,
          content: req.body.content
        });
        res.status(200).json(goCreateQuestions);
      }
    } catch (e) {
      next(e);
    }
  }

  static async clientQuestions(req, res, next) {
    try {
      if (req.user) {
        const getthisrequest = await Question.find({ user: req.user._id });
        if (!getthisrequest.length) {
          res.status(204).json({ error: "empty" });
        } else {
          res.status(200).json(getthisrequest);
        }
      } else {
        const getAnotherrequest = await Question.find({ ...req.body });
        if (!getAnotherrequest.length) {
          res.status(204).json({ error: `cant found any` });
        } else {
          res.status(200).json(getAnotherrequest);
        }
      }
    } catch (e) {
      next(e);
    }
  }

  static async findPopulate(req, res, next) {
    try {
      const findAll = await Question.find({ user: req.params.id }).populate(
        "user upvote downvote favorited answers comments"
      );
      res.status(200).json(findAll);
    } catch (e) {
      next(e);
    }
  }

  static async findAllPopulate(req, res, next) {
    try {
      const findAll = await Question.find({}).populate(
        "user upvote downvote favorited answers"
      );
      // const findAll = await Question.find({}).populate("user");
      res.status(200).json(findAll);
    } catch (e) {
      next(e);
    }
  }

  static async updatedOne(req, res, next) {
    try {
      if (req.body.downvote) {
        const update = await Question.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { downvote: req.user._id } },
          { runValidators: true }
        );
        if (!update) {
          res.status(204).json({ error: "no content" });
        } else {
          res.status(200).json(update);
        }
      } else if (req.body.upvote) {
        const update = await Question.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { upvote: req.user._id } },
          { runValidators: true }
        );
        if (!update) {
          res.status(204).json({ error: "no content" });
        } else {
          res.status(200).json(update);
        }
      } else {
        const update = await Question.findOneAndUpdate(
          { _id: req.params.id },
          { ...req.body },
          { runValidators: true }
        );
        if (!update) {
          res.status(204).json({ error: "no content" });
        } else {
          res.status(200).json(update);
        }
      }
    } catch (e) {
      next(e);
    }
  }

  static async findOneAndDelete(req, res, next) {
    try {
      const findFirst = await Question.findOne({ _id: req.params.id });
      if (!findFirst) {
        next("router");
      } else {
        if (findFirst.upvote.length >= 3) {
          res.status(406).json({
            error: `you can't delete question because it already upvoted more than 3`
          });
        } else {
          const deleted = await Question.findByIdAndDelete(req.params.id);
          res.status(200).json({ msg: "succesfully deleted", data: deleted });
        }
      }
    } catch (e) {
      next(e);
    }
  }

  static async deepPopulate(req, res, next) {
    try {
      const findDeep = await Question.findOne({
        $or: [{ _id: req.params.id }, { user: req.params.id }]
      })
        .populate("user")
        .populate("upvote")
        .populate("downvote")
        .populate("favorited")
        .populate({
          path: "comments"
          // populate
        })
        .populate({
          path: "answers",
          // populate: "user upvote downvote comments"
          populate: [
            {
              path: "user"
            },
            {
              path: "upvote"
            },
            {
              path: "downvote"
            },
            {
              path: "comments",
              populate: {
                path: "user"
              }
            }
          ]
        });
      if (!findDeep) {
        res.status(204).json({ error: `something error or can't found any` });
      } else {
        res.status(200).json(findDeep);
      }
    } catch (e) {
      next(e);
    }
  }

  static async filterQuestions(req, res, next) {
    try {
      const goFilter = await Question.find({
        title: { $regex: req.body.search, $options: "i" }
      });
      if (goFilter) {
        res.status(400).json({ error: `can't found any` });
      } else {
        res.status(200).json(goFilter);
      }
    } catch (e) {
      next(e);
    }
  }

  // static findQuestionsByCategory(req, rest, next) {
  //   try {
  //     const goFind =
  //   } catch (e) {
  //     next(e)
  //   }
  // }
}

module.exports = QuestionService;
