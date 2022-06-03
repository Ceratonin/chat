import { useEffect, useReducer } from "react";
import socket from "./socket";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import reducer, { ACTIONS } from "./components/reducer";

interface ISocketData {
  login: string;
  room: string;
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    login: "",
    room: "",
    users: [],
    messages: [],
  });

  const enterRoom = (data: ISocketData) => {
    dispatch({
      type: ACTIONS.LOGIN,
      payload: data,
    });
    
    socket.emit("connected", data);
    (window as any).socket = socket;
  };

  const setUsers = (data: string[]) => {
    dispatch({ type: ACTIONS.SET_USERS, payload: data });
  };

  useEffect(() => {
    socket.on("connected", setUsers);
    socket.on("disconnected", setUsers);
  }, []);

  return (
    <div className="wrapper">
      {!state.isLogin ? (
        <Login enterRoom={enterRoom} />
      ) : (
        <Chat users={state.users} />
      )}
    </div>
  );
}

export default App;
