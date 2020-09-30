import { types, AuthState } from "../Types/auth";

let initialState: AuthState = {};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginError: false
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loggedInStatus: true,
        loading: false,
        loginError: null,
        token: action.payload.token
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loggedInStatus: false,
        loading: false,
        loginError: action.payload
      };
    case types.FORGOT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.FORGOT_SUCCESS:
      return {
        ...state,
        forgotSuccess: true,
        loading: false
      };
    case types.FORGOT_FAILURE:
      return {
        ...state,
        forgotSuccess: false,
        loading: false
      };
    case types.RESET_FORGOT_SUCCESS_VARIABLE:
      return {
        ...state,
        forgotSuccess: null
      };
    case types.RESET_EMAIL_VERIFIED_VARIABLE:
      return {
        ...state,
        loginError: action.payload
      };
    case types.RESET_REQUEST:
      return {
        ...state,
        loading: true,
        resetError: false
      };

    case types.RESET_SUCCESS:
      return {
        ...state,
        resetSuccess: true,
        loading: false
      };
    case types.RESET_FAILURE:
      return {
        ...state,
        resetSuccess: false,
        loading: false
      };
    case types.VERIFY_REQUEST:
      return {
        ...state,
        verify: {
          verifyLoading: true,
          VerifyError: false,
          VerifySuccess: false
        }
      };
    case types.VERIFY_FAILURE:
      return {
        ...state,
        verify: {
          verifyLoading: false,
          VerifyError: true,
          VerifySuccess: false
        }
      };
    case types.VERIFY_SUCCESS:
      return {
        ...state,
        verify: {
          verifyLoading: false,
          VerifyError: false,
          VerifySuccess: true
        }
      };
    case types.UPDATE_USER:
      return { ...state, user: action.payload };
    case types.LOUGOUT_SUCCESS:
      return {
        ...state,
        loggedInStatus: false
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
