import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import "./login.scss";

function Login() {
  const [login, setlogin] = useState("");
  const [room, setRoom] = useState("");

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlogin(e.target.value);
  };

  const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          background: "linear-gradient(45deg, #2196f3 30%, #6ce3ff 90%)",
          color: "white",
          width: "20rem",
          height: "21rem",
          flexDirection: "column",
          borderRadius: "0.5rem",
        }}
        elevation={12}
      >
        <div className="auth_block login">Логин</div>

        <div className="auth_block input-group">
          Никнейм:
          <input
            type="text"
            className="form-control"
            value={login}
            onChange={handleChangeLogin}
          />
        </div>

        <div className="auth_block input-group">
          Комната:
          <input
            type="text"
            className="form-control"
            value={room}
            onChange={handleChangeRoom}
          />
        </div>

        <div className="auth_block">
          <button type="submit" className="btn btn-primary"> Авторизоваться </button>
        </div>
      </Paper>
    </Box>
  );
}

export default Login;
