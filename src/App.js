import { useState } from "react";
import socket from "./socket";
import Login from "./Pages/Login/Login";

function App() {
  const [isLogin, setLogin] = useState(false);
  const enterRoom = () => {
    setLogin(val => !val)
    socket.emit("loggedIn")
  };

  return (
    <div className="wrapper">
      {!isLogin ? <Login enterRoom={enterRoom} /> : <div>Halo</div>}
    </div>
  );
}

export default App;
