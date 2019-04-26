const express = require("express");
const router = express.Router();
const {
  AnswerService,
  PersonService,
  QuestionService,
  CommentService
} = require("../controller/index.js");
const {
  AnswerPolicy,
  AnswerPolicyVote
} = require("../middleware/answerPolice.js");
const [Authentic, Authorization, Deleteauthorization] = [
  require("../middleware/authentications.js"),
  require("../middleware/authoriZation.js"),
  require("../middleware/deleteAuthorrization.js")
];

router.get("/get/:id", AnswerService.getOne);
router.post("/create", Authentic, AnswerService.create);
router.put("/update/:id", Authentic, AnswerPolicy, AnswerService.updated);
router.put(
  "/updatevote/:id",
  Authentic,
  AnswerPolicyVote,
  AnswerService.updated
);
router.delete(
  "/delete/:id",
  Authentic,
  Deleteauthorization,
  AnswerService.destroy
);

router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
