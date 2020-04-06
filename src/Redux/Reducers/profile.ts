import { types, ProfileState } from "../Types/profile";

const initialState: ProfileState = {};

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    case types.PROFILE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload.message
      };
    default: {
      return state;
    }
  }
};

export default profileReducer;
