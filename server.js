const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const rooms = new Map();

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.post("/rooms", (req, res) => {
  const { room, login } = req.body;

  if (!rooms.has(room)) {
    rooms.set(
      room,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }

  res.send();
});

io.on("connection", (socket) => {
  socket.on("connection", (data) => {
    const {room, login} = data

    socket.join(room);
    rooms.get(room).get("users").set(socket.id, login);

    const inRoomUsers = [...rooms.get(room).get("users").values()]
    socket.to(room).emit("connected", inRoomUsers)
  });
  console.log("USER-", socket.id);
});

const PORT = 4444;

server.listen(PORT, console.log("Работаем"));
