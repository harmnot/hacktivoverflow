require("dotenv").config();
const [express, mongoose, cors, morgan] = [
  require("express"),
  require("mongoose"),
  require("cors"),
  require("morgan")
];
const cron = require("node-cron");
const app = express();
const defaultROUTE = require("./routes/index.js");
const PORT = process.env.PORT || 3000;
const Question = require("./model/question.js");

const [people, category] = [
  require("./routes/person_router.js"),
  require("./routes/category_service.js")
];

const uri = `mongodb+srv://${process.env.MONGO_DB_NAME}:${
  process.env.MONGO_DB_KEY
}@hamrnot-iasow.mongodb.net/${process.env.MONGO_DB_DOCUMENT}?retryWrites=true`;

mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`========> MongoDB connected <========`))
  .catch(err => console.log(err, "ini error"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

// 5 8 * * 0 would run 8:05 every Sunday.
cron.schedule("5 8 * * 0", function() {
  //delete empty answers every sunday
  deleteNotUSeQuestion();
});

const log = () => {
  console.log("heheh");
};
const deleteNotUSeQuestion = async () => {
  try {
    let ids = [];
    const deleted = await Question.find({});
    for (let findEmpty of deleted) {
      if (findEmpty.answers.length === 0) {
        ids.push(findEmpty._id);
      }
    }

    const goingToDelete = await Question.deleteMany({ _id: { $in: ids } });
    console.log(goingToDelete);
  } catch (e) {
    console.log(e);
  }
};

app.use("/", defaultROUTE);

app.listen(PORT, () => {
  console.log(`you are connected to http://localhost:${PORT}`);
});
