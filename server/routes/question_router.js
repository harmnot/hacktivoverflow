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

// what ever to search
router.get("/getwhatever", QuestionService.clientQuestions);

router.get("/getall", QuestionService.findAllPopulate);
router.get("/userquestions", Authentic, QuestionService.findPopulate);
router.get("/search", QuestionService.filterQuestions);
router.get("/userquestion/:id", QuestionService.deepPopulate);
// router.get("/userquestion/:id", QuestionService.deepPopulate);
router.post("/add", Authentic, QuestionService.add);
router.put("/update/:id", Authentic, Authorization, QuestionService.updatedOne);
router.delete(
  "/delete/:id",
  Authentic,
  Authorization,
  QuestionService.findOneAndDelete
);

router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
