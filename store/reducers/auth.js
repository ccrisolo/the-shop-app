import { LOGIN, LOGOUT } from "../actions/auth";
import { SIGNUP } from "../actions/auth";
import { AUTHENTICATE } from "../actions/auth";
//set initial state for token
const initialState = {
  token: null,
  userId: null,
};

//set logic to store the token
export default (state = initialState, action) => {
  switch (action.type) {
    //combined LOGIN and SIGNUP into AUTHENTICATE
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};
