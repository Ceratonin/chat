import React, { useState } from "react";
import axios from "axios";
import "./login.scss";
import { IEnterRoom } from "../../utils/types";
// import useLocalStorage from "../../components/useLocalStorage";

function Login({ enterRoom }: IEnterRoom) {
  const [login, setlogin] = useState("");
  const [room, setRoom] = useState("");
  const [loading, isLoading] = useState(false);
  const [isValid, setValid] = useState({
    checkValidLogin: true,
    checkValidRoom: true,
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlogin(e.target.value);
  };

  const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  // const [storedValue, setStoredValue] = useLocalStorage(isValid.loginVerified, "false");

  const handleClick = async () => {
    // setStoredValue("true");

    const obj = {
      login,
      room,
    };

    setValid({
      checkValidLogin: Boolean(
        login.match(/^\S*$/) && login.trim() && login !== "service"
      ),
      checkValidRoom: Boolean(room.match(/^\d+$/)),
    });

    if (
      login === "" ||
      !login.match(/^\S*$/) ||
      login === "service" ||
      room === "" ||
      !room.match(/^\d+$/)
    ) {
      return;
    }

    isLoading((val) => !val);

    await axios.post("/rooms", obj).then(() => enterRoom(obj));
  };

  return (
    <div className="page_login">
      <section>
        <form className="needs-validation">
          <div className="auth_block login">Логин</div>

          <div
            className={`auth_block input-group ${
              !isValid.checkValidLogin ? "err" : ""
            }`}
          >
            <div className="auth_block_title">
              Никнейм:
              <span className="err_msg">
                {!isValid.checkValidLogin ? "Неверные данные" : ""}
              </span>
            </div>

            <input
              type="text"
              className={`form-control ${
                !isValid.checkValidLogin ? "err_inp" : ""
              }`}
              value={login}
              onChange={handleChangeLogin}
              required
            />
          </div>

          <div
            className={`auth_block input-group ${
              !isValid.checkValidRoom ? "err" : ""
            }`}
          >
            <div className="auth_block_title">
              Комната:
              <span className="err_msg">
                {!isValid.checkValidRoom ? "Неверные данные" : ""}
              </span>
            </div>

            <input
              type="text"
              className={`form-control ${
                !isValid.checkValidRoom ? "err_inp" : ""
              }`}
              value={room}
              onChange={handleChangeRoom}
              required
            />
          </div>

          <div className="auth_block">
            <button
              disabled={loading}
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
