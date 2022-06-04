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

app.get("/rooms/:room", (req, res) => {
  const { room } = req.params;

  const data = rooms.has(room)
    ? {
        users: [...rooms.get(room).get("users").values()],
        messages: [...rooms.get(room).get("messages").values()],
      }
    : { users: [], messages: [] };
  res.json(data);
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
  socket.on("connected", (data) => {
    const { room, login } = data;

    socket.join(room);
    rooms.get(room).get("users").set(socket.id, login);

    const inRoomUsers = [...rooms.get(room).get("users").values()];
    socket.to(room).emit("connected", inRoomUsers);
  });

  socket.on("disconnect", (data) => {
    const { room, login } = data;

    rooms.forEach((value, key) => {
      if (value.get("users").delete(socket.id)) {
        const inRoomUsers = [...value.get("users").values()];
        socket.to(key).emit("disconnected", inRoomUsers);
      }
    });
  });

  socket.on("message", (data) => {
    const { room, login, messages } = data;

    rooms.get(room).get("messages").push(data);

    socket.to(room).emit("message", data);
  });
});

const PORT = 4444;

server.listen(PORT, console.log("Работаем"));
