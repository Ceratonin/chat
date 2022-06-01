import { useEffect, useState } from "react";
import socket from "./socket";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";

interface ISocketData {
  login: string;
  room: string;
}

function App() {
  const [isLogin, setLogin] = useState(false);

  const enterRoom = (data: ISocketData) => {
    setLogin((val) => !val);
    socket.emit("connection", data);
    (window as any).socket = socket;
  };

  useEffect(() => {
    socket.on("connected", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="wrapper">
      {isLogin ? <Login enterRoom={enterRoom} /> : <Chat />}
    </div>
  );
}

export default App;
