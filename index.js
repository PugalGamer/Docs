const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/student.model.js");
const studentRoute = require("./routes/student.route.js");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.text());
// app.use(cors());
app.use(
  cors({
    // origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use("/api/students", studentRoute);

mongoose
  .connect("mongodb://localhost:27017/MCA")
  .then(() => {
    console.log("db connected");
    app.listen(4000, () => {
      console.log("server is running 4000");
    });
  })
  .catch(() => {
    console.log("db failed");
  });

app.get("/", (req, res) => {
  res.send("the Node server is running,API");
});
