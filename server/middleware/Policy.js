const Joi = require("joi");

class Policy {
  static checkReqBodyUser(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().min(7),
      name: Joi.string()
    };

    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res
            .status(400)
            .json({ error: "your email must provide a valid email address " });
          break;
        case "password":
          res
            .status(400)
            .json({ error: "we only allow password more than 7 length " });
          break;
        case "name":
          res.status(400).json({ error: "please make sure your name valid" });
          break;
        default:
          next();
          break;
      }
    } else {
      next();
    }
  }
  static checkReqBodyArticle(req, res, next) {
    const schema = {
      title: Joi.string().min(10),
      content: Joi.string().min(100)
    };

    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "title":
          res
            .status(400)
            .json({ error: `please write more your tittle for descriptif ` });
          break;
        case "content":
          res.status(400).json({
            error: `please explain more your question to make other users to help you`
          });
          break;
        default:
          next();
          break;
      }
    } else {
      next();
    }
  }
}

module.exports = Policy;
