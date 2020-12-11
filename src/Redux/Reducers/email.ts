import { types } from "../Types/email";

const initialState: any = {
  emailConfigurations: []
};

const emailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ADD_EMAIL_CONFIGURATION:
      return { ...state, loading: true };
    case types.ADD_EMAIL_CONFIG_SUCCESS:
      return {
        ...state,
        emailConfig: action.payload,
        emailConfigurations: [...state.emailConfigurations, action.payload],
        loading: false
      };
    case types.ADD_EMAIL_CONFIG_FAILURE:
      return {
        ...state,
        loading: false
      };
    case types.GET_USER_EMAIL_CONFIG:
      return {
        ...state,
        loading: true
      };
    case types.GET_USER_EMAIL_CONFIG_SUCCESS:
      //console.log("email configurations in reducer", state.emailConfigurations)
      return {
        ...state,
        emailConfigurations: [...action.payload],
        loading: false
      };
    case types.GET_USER_EMAIL_CONFIG_FAILURE:
      return {
        ...state,
        loading: false
      };
    case types.DELETE_USER_CONFIG:
      return {
        ...state,
        isDeleting: true
      };
    case types.DELETE_USER_CONFIG_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        emailConfigurations: action.payload,
        showDeleteDialog: false
      };
    case types.ENABLE_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: true
      };
    case types.DELETE_USER_CONFIG_FAILURE:
      return {
        ...state,
        isDeleting: false,
        showDeleteDialog: false
      };
    default: {
      return state;
    }
  }
};

export default emailReducer;
