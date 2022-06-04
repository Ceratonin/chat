export const ACTIONS = {
  LOGIN: "login",
  SET_USERS: "setUsers",
  SET_MESSAGES: "setMessages",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogin: true,
        login: action.payload.login,
        room: action.payload.room,
      };

    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ACTIONS.SET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
