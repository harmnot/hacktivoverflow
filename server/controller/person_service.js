const {
  Answer,
  Question,
  Person,
  Comment,
  Category
} = require("../model/index.js");
const { comparePassword } = require("../helper/hashing_password.js");
const { jwtSign } = require("../helper/jwt.js");

class PersonService {
  static async register(req, res, next) {
    try {
      const checkFirst = await Person.findOne({ email: req.body.email });
      if (checkFirst) {
        res.status(403).json({ error: "email already exist" });
      } else {
        const createNewUser = await Person.create({ ...req.body });
        res.status(201).json(createNewUser);
      }
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const tryingLogin = await Person.findOne({ email: req.body.email });
      if (!tryingLogin) {
        res.status(404).json({
          error: `cant't found ${req.body.email}, please register firs`
        });
      } else {
        const isMatch = await comparePassword(
          req.body.password,
          tryingLogin.password
        );
        if (isMatch) {
          const token = jwtSign({
            _id: tryingLogin._id,
            name: req.body.name,
            email: req.body.email
          });
          res
            .status(200)
            .json({ data: tryingLogin, token, id: tryingLogin._id });
        } else {
          res.status(400).json({ error: `incorrect password!` });
        }
      }
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const updating = await Person.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { watchCatergory: req.body.input } }
      );
      res.status(200).json(updating);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PersonService;
