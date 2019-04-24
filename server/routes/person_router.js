const express = require("express");
const router = express.Router();
const {
  AnswerService,
  PersonService,
  QuestionService,
  CommentService
} = require("../controller/index.js");
const [Authentic, Authorization] = [
  require("../middleware/authentications.js"),
  require("../middleware/authoriZation.js")
];

router.post("/login", PersonService.login);
router.post("/register", PersonService.register);
router.put("/update", Authentic, PersonService.update);

router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
