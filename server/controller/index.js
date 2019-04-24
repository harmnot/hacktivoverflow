const [
  AnswerService,
  PersonService,
  QuestionService,
  CommentService,
  CategoryService
] = [
  require("./answer_service.js"),
  require("./person_service.js"),
  require("./question_service.js"),
  require("./commentService.js"),
  require("./categoryService.js")
];

module.exports = {
  AnswerService,
  PersonService,
  QuestionService,
  CommentService,
  CategoryService
};
