const express = require("express");

const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
// app.use("/api", require("./Routes/CreateUser"));
// app.use("/api", require("./Routes/DisplayData.js"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", require("./Routes/Auth"));

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
