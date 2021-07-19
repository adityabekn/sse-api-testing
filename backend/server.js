const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.port || 3001;

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ msg: "api running" });
});

// app.get("/data", sseExpress, function (req, res) {
//   res.sse("update", {
//     welcomeMsg: "Hello World",
//   });
// });

// Define Routes
app.use("/tasks", require("./routes/task.routes"));
app.use("/live", require("./routes/live.routes"));

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
