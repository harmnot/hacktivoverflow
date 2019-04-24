const mongoose = require("mongoose");
const {
  hashingPassword,
  comparePassword
} = require("../helper/hashing_password.js");

const Schema = mongoose.Schema;

const user = new Schema(
  {
    email: {
      type: String,
      required: [true, "please enter email"],
      index: true,
      unique: [true, "email already exist"],
      validate: {
        validator: function(v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: props => `${props.value} is invalid email`
      },
      required: [true, "please fill your valid email"]
    },
    password: {
      type: String,
      required: [true, "please enter password"],
      validate: {
        validator: v => {
          return v.length <= 7 ? false : true;
        },
        message: props => `${props.value} password must be more than 7 chars`
      }
    },
    name: {
      type: String,
      required: [true, `fill your email`]
    },
    question: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    watchCatergory: {
      type: Array
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

user.pre("save", function(next) {
  let user = this;
  hashingPassword(user)
    .then(response => {
      user.password = response;
      next();
    })
    .catch(err => {
      next(err);
    });
});

user.pre("save", function(next) {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Person = mongoose.model("Person", user);

module.exports = Person;
