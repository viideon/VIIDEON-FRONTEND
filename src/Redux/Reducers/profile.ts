import { types } from "../Types/profile";

const initialState: any = {
  loading: false,
};

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ADD_PROFILE_DATA:
      return { ...state, user: action.payload.user }
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
      };
    default: {
      return state;
    }
  }
};

export default profileReducer;
