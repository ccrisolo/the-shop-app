import { LOGIN } from "../actions/auth";
import { SIGNUP } from "../actions/auth";
//set initial state for token
const initialState = {
  token: null,
  userId: null,
};

//set logic to store the token
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
