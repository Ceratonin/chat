const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").Server(app);

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

const PORT = 4444;

server.listen(PORT, console.log("Работаем"));
