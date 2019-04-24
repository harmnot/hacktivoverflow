require("dotenv").config();
const [express, mongoose, cors, morgan] = [
  require("express"),
  require("mongoose"),
  require("cors"),
  require("morgan")
];

const app = express();
const defaultROUTE = require("./routes/index.js");
const PORT = process.env.PORT || 3000;

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

app.use("/", defaultROUTE);

app.listen(PORT, () => {
  console.log(`you are connected to http://localhost:${PORT}`);
});
