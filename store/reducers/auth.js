import { LOGIN, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";
import { SIGNUP } from "../actions/auth";
import { AUTHENTICATE } from "../actions/auth";
//set initial state for token
const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

//set logic to store the token
export default (state = initialState, action) => {
  switch (action.type) {
    //combined LOGIN and SIGNUP into AUTHENTICATE
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };  
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      }
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};
