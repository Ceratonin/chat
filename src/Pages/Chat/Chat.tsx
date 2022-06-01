import React, { useState } from "react";
import "./chat.scss";

function Chat() {
  const [inputMessage, setInputMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleClick = () => {};

  const messagesObj = new Map([
    ["Albert", "Привет, меня зовут Albert"],
    ["Dodik", "Ты не Альберт, ты додик"],
    ["Крутой", "додиком зовут то тебя"],
    ["Хихич", "Хихихихиххихихих"],
    ["23", "Привет, меня зовут Albert"],
    ["23", "Ты не Альберт, ты додик"],
    ["32", "додиком зовут то тебя"],
    ["123", "Хихихихиххихихих"],
    ["12341234", "Привет, меня зовут Albert"],
    ["234", "Ты не Альберт, ты додик"],
    ["543", "додиком зовут то тебя"],
    ["54135", "Хихихихиххихихих"],
  ]);
  const users = [...messagesObj.keys()];
  
  return (
    <div className="page_chat">
      <section>
        <div className="users_block">
          <span className="users_header">Пользователи({users.length}):</span>
          <hr className="users_line" />
          <div className="users_list" id="scroll">
            {users.map((user, key) => (
              <h4 key={key} className="users_user">
                {user}
              </h4>
            ))}
          </div>
        </div>

        <div className="chat_block">
          <div className="chat_messages_list" id="scroll">
            {[...messagesObj.entries()].map(([userName, message], key) => (
              <div key={key} className="chat_message_obj">
                <span className="chat_message">{message}</span>
                <span className="chat_message_userName">{userName}</span>
              </div>
            ))}
          </div>

          <div className="message_send_block">
            <form className="message_send">
              <input
                type="text"
                className="form-control message_send_text"
                value={inputMessage}
                onChange={handleChange}
                placeholder="Напишите сообщение..."
              />

              <button
                type="button"
                className="btn message_send_btn"
                onClick={handleClick}
              >
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
