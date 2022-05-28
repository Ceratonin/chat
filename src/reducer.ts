export const ACTIONS = {
  ISLOGINVALID: "validateLogin",
  ISROOMVALID: "validateRoom",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.ISLOGINVALID:
      if (action.payload.login !== "" && action.payload.login.match(/^\S*$/)) {
        return { ...state, isLoginValid: true };
      }
      return { ...state, isLoginValid: false };

    case ACTIONS.ISROOMVALID:
      if (action.payload.room !== "" && action.payload.room.match(/^\d+$/)) {
        return { ...state, isRoomValid: true };
      }
      return { ...state, isRoomValid: false };

    default:
      return state;
  }
};

export default reducer;
