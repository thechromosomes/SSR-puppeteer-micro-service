require("dotenv").config();
global.express = require("express");

const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routeHandler = require("./routes/index");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
global.fetch = fetch;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3003;
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", routeHandler);

app.use("/*", function (req, res) {
  res.status(404).sendFile("./public/404.html", { root: __dirname });
});
app.listen(port, () => console.log(`listening on port ${port}`));
