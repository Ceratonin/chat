import { IChat } from "../../utils/types";
import UsersBlock from "./usersBlock/UsersBlock";
import ChatBlock from "./chatBlock/ChatBlock";
import "./chat.scss";

function Chat({ state, setMessage }: IChat) {
  return (
    <div className="page_chat">
      <section>
        <UsersBlock state={state} />
        <ChatBlock state={state} setMessage={setMessage} />
      </section>
    </div>
  );
}

export default Chat;
