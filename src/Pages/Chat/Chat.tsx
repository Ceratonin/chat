import React, { useState } from "react";
import socket from "../../utils/socket";
import { IChat } from "../../utils/types";
import "./chat.scss";

function Chat({ state, myMessage }: IChat) {
  const { login, room, users, messages } = state;
  const [inputMessage, setInputMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", { login, room, inputMessage });
    myMessage({ login, inputMessage });
    setInputMessage("");
  };

  return (
    <div className="page_chat">
      <section>
        <div className="users_block">
          <div className="users_header">
            <span>Комната {room}</span>
            <span>Пользователи({users.length}):</span>
          </div>
          <hr className="users_line" />
          <ul className="users_list" id="scroll">
            {users.map((user, key) => (
              <li key={key} className="users_user">
                {user}
              </li>
            ))}
          </ul>
        </div>

        <div className="chat_block">
          <div className="chat_messages_list" id="scroll">
            {messages.map((message, key) =>
              message.login === login ? (
                <div key={key} className="chat_message_obj">
                  <span className="my chat_message">{message.inputMessage}</span>
                  <span className="my chat_message_userName">{message.login}</span>
                </div>
              ) : (
                <div key={key} className="chat_message_obj">
                  <span className="chat_message">{message.inputMessage}</span>
                  <span className="chat_message_userName">{message.login}</span>
                </div>
              )
            )}
          </div>

          <div className="message_send_block">
            <form className="message_send" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control message_send_text"
                value={inputMessage}
                onChange={handleChange}
                placeholder="Напишите сообщение..."
              />

              <button type="submit" className="btn message_send_btn">
                <i className="bi bi-send-fill" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Chat;
