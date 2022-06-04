import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { IChat } from "../../../utils/types";
import socket from "../../../utils/socket";
import "./chatBlock.scss"

function ChatBlock({ state, setMessage }: IChat) {
  const { login, room, messages } = state;
  const [inputMessage, setInputMessage] = useState("");

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
        time: moment().format("HH:mm"),
      });
      setMessage({ login, inputMessage, time: moment().format("HH:mm") });
    }
    setInputMessage("");
  };

  const scrollToMessage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollToMessage !== null && scrollToMessage.current !== null) {
      scrollToMessage.current.scrollIntoView({
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="chat_block">
      <div className="chat_messages_list" id="scroll">
        {messages.map((message, key) => (
          <div ref={scrollToMessage} key={key} className="chat_message_obj">
            {message.login === login ? (
              <div className="my_message">
                <span className="chat_message">{message.inputMessage}</span>
                <div className="chat_message_info">
                  <span>Вы</span>
                  <span>{message.time}</span>
                </div>
              </div>
            ) : message.login === "service" ? (
              <div className="service_message">
                <span className="chat_message">{message.inputMessage}</span>
              </div>
            ) : (
              <div>
                <span className="chat_message">{message.inputMessage}</span>
                <div className="chat_message_info">
                  <span>{message.login}</span>
                  <span>{message.time}</span>
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
  );
}

export default ChatBlock;
