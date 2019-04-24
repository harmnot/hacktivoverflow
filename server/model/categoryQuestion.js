const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String
    },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
