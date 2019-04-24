const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Person" },
    cooment: {
      type: String
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
