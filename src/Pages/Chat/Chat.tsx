import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import socket from "../../utils/socket";
import { IChat } from "../../utils/types";
import "./chat.scss";

function Chat({ state, myMessage }: IChat) {
  const { login, room, users, messages } = state;
  const [inputMessage, setInputMessage] = useState("");

  const scrollToMessage = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage !== "") {
      socket.emit("message", {
        login,
        room,
        inputMessage,
        time: moment().format("HH:m"),
      });
      myMessage({ login, inputMessage, time: moment().format("HH:m") });
    }
    setInputMessage("");
  };

  useEffect(() => {
    if (scrollToMessage !== null && scrollToMessage.current !== null) {
      scrollToMessage.current.scrollIntoView({
        block: "end",
      });
    }
  }, [messages]);

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
            {messages.map((message, key) => (
              <div ref={scrollToMessage} key={key} className="chat_message_obj">
                {message.login === login ? (
                  <div className="my_message">
                    <span className="chat_message">{message.inputMessage}</span>
                    <div className="chat_message_info">
                      <span >Вы</span>
                      <span >{message.time}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="chat_message">{message.inputMessage}</span>
                    <div className="chat_message_info">
                      <span >
                        {message.login}
                      </span>
                      <span >{message.time}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
