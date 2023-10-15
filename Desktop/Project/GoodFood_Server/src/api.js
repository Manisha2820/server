const express = require("express");
const serverless = require("serverless-http");
//const mongoDB = require("./db");
//mongoDB();
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "Index page",
  });
});

router.get("/another", (req, res) => {
  res.json({
    hello: "Another page",
  });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
