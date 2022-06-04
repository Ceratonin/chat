import { IState } from "../../../utils/types";
import "./usersBlock.scss";

function UsersBlock({ state }: { state: IState }) {
  const { room, users } = state;

  const handleExit = () => {
    window.location.reload();
  };

  return (
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
      <button className="btn exit_btn" type="button" onClick={handleExit}>
        Выйти
      </button>
    </div>
  );
}

export default UsersBlock;
