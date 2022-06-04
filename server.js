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

    const serviceMessage = {
      login: "service",
      room,
      inputMessage: `${login} подключился`,
      time: "",
    };

    socket.join(room);
    rooms.get(room).get("users").set(socket.id, login);

    const inRoomUsers = [...rooms.get(room).get("users").values()];
    socket.to(room).emit("connected", inRoomUsers);

    rooms.get(room).get("messages").push(serviceMessage);
    socket.to(room).emit("serviceMessage", serviceMessage);
  });

  socket.on("disconnect", () => {
    rooms.forEach((data, room) => {
      const serviceMessage = {
        login: "service",
        room,
        inputMessage: `${data.get("users").get(socket.id)} отключился`,
        time: "",
      };

      if (data.get("users").delete(socket.id)) {
        const inRoomUsers = [...data.get("users").values()];
        socket.to(room).emit("disconnected", inRoomUsers);
        
        rooms.get(room).get("messages").push(serviceMessage);
        socket.to(room).emit("serviceMessage", serviceMessage);
      }
    });
  });

  socket.on("message", (messageData) => {
    const { room, login, inputMessage } = messageData;

    rooms.get(room).get("messages").push(messageData);
    socket.to(room).emit("message", messageData);
  });
});

const PORT = 4444;

server.listen(PORT, console.log("Работаем"));
