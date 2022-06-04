export interface IMessagesArr {
  inputMessage: string;
  login: string;
  time:string
}

export interface IState {
  isLogin: boolean;
  login: string;
  room: string;
  users: string[];
  messages: IMessagesArr[];
}

export interface IChat {
  state: IState;
  setMessage: (message: IMessagesArr) => void;
}

export interface ISocketData {
  login: string;
  room: string;
}

export interface IEnterRoom {
  enterRoom: (obj: { login: string; room: string }) => void;
}
