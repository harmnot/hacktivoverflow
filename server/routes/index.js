const express = require("express");
const router = express.Router();

const [people, answer, question, comment, category] = [
  require("./person_router.js"),
  require("./answer_router.js"),
  require("./question_router.js"),
  require("./cooment_router.js"),
  require("./category_service.js")
];

router.use("/api/people", people);
router.use("/api/question", question);
router.use("/api/answer", answer);
router.use("/api/comment", comment);
router.use("/api/category", category);

module.exports = router;
