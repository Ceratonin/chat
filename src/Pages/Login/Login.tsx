import React, { useState, useReducer } from "react";
import "./login.scss";
import axios from "axios";

function Login() {
  const [login, setlogin] = useState("");
  const [room, setRoom] = useState("");
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isRoomValid, setIsRoomValid] = useState(false);
  const [isValid, setValid] = useState({ loginValid: false, roomValid: false });

  const reduce = () => {};

  // useReducer(reduce, { loginValid: false, roomValid: false });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlogin(e.target.value);
    setIsLoginValid(true);
    // setValid({ loginValid: true });
  };

  const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
    setIsRoomValid(true);
  };

  const handleClick = async () => {
    if (!room) return setIsRoomValid(false);
    if (!login) return setIsLoginValid(false);

    await axios.post("/rooms", (req: any, res: any) =>
      res.send(`${login}, ${room}`)
    );
  };

  return (
    <div className="page_login">
      <section>
        <form className="needs-validation">
          <div className="auth_block login">Логин</div>

          <div className="auth_block input-group">
            Никнейм:
            <input
              type="text"
              className="form-control"
              value={login}
              onChange={handleChangeLogin}
              required
            />
          </div>

          <div className="auth_block input-group">
            Комната:
            <input
              type="text"
              className="form-control"
              value={room}
              onChange={handleChangeRoom}
              required
            />
          </div>

          <div className="auth_block">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Авторизоваться
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
