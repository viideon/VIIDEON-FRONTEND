import { types, ProfileState } from "../Types/profile";

const initialState: ProfileState = {};

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ADD_PROFILE_DATA:
      return { ...state, user: action.payload }
    case types.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message.message,
        user: action.payload.message.user

      };
    case types.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message.message
      };
    default: {
      return state;
    }
  }
};

export default profileReducer;
