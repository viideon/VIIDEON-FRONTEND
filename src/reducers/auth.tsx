import { Locality } from '../actions/interfaces';
import {
  LOGIN_SUCCESS,
  LOGIN,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED,
} from '../actions/constants';

export default function authReducer(
  state = { isAuthenticated: false },
  action: Locality,
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS: {
      const { user, token } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
        token,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isAuthenticated: false,
        message: action.payload,
      };
    }
    case SIGNUP: {
      return state;
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isSignupSuccess: true,
      };
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        isSignupSuccess: false,
      };
    }
    default:
      return state;
  }
}
