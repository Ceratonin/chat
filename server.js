// import { PORT } from "./src/utils/consts"

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").Server(app);

const constants = require("./src/utils/consts");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Работа");
});

app.post("/rooms", (req, res) => {
  console.log(req.body);
});

server.listen(constants.PORT, console.log("Работаем"));
