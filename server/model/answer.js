const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Person" },
    fromquestion: { type: Schema.Types.ObjectId, ref: "Question" },
    answer: {
      type: String,
      required: [true, "pleaser enter your answer"]
    },
    upvote: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    downvote: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
