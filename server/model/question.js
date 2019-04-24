const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsChema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Person" },
    title: {
      type: String,
      required: [true, "please specification your question"]
    },
    content: {
      type: String,
      required: [true, "please explain your question"],
      validate: {
        validator: v => {
          return v.length <= 40 ? false : true;
        },
        message: props => `we only allow this question is more detail`
      }
    },
    upvote: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    downvote: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    favorited: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    view: {
      type: Number,
      default: 0
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Question = mongoose.model("Question", questionsChema);

module.exports = Question;
