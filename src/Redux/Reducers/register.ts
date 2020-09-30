import { types, RegisterState } from "../Types/register";

let initialState: RegisterState = {};

const registerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
        isSignupSuccess: false
      };
    case types.REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSignupSuccess: true
      };
    case types.REGISTRATION_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        isSignupSuccess: false
      };
    default: {
      return state;
    }
  }
};

export default registerReducer;
