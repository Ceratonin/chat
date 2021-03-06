import { useEffect, useReducer } from "react";
import axios from "axios";
import socket from "./utils/socket";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import reducer, { ACTIONS } from "./components/reducer";
import { ISocketData, IMessagesArr } from "./utils/types";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    login: "",
    room: "",
    users: [],
    messages: [],
  });

  const setUsers = (data: string[]) => {
    dispatch({ type: ACTIONS.SET_USERS, payload: data });
  };

  const setMessage = (message: IMessagesArr) => {
    dispatch({ type: ACTIONS.SET_MESSAGES, payload: message });
  };

  const enterRoom = async (loginData: ISocketData) => {
    dispatch({
      type: ACTIONS.LOGIN,
      payload: loginData,
    });

    socket.emit("connected", loginData);
    const { data }: any = await axios.get(`/rooms/${loginData.room}`);
    dispatch({
      type: ACTIONS.GET_DATA,
      payload: data,
    });
  };

  useEffect(() => {
    socket.on("connected", setUsers);
    socket.on("serviceMessage", setMessage);
    socket.on("message", setMessage);
    socket.on("disconnected", setUsers);
  }, []);

  return (
    <div className="wrapper">
      {!state.isLogin ? (
        <Login enterRoom={enterRoom} />
      ) : (
        <Chat state={state} setMessage={setMessage} />
      )}
    </div>
  );
}

export default App;
