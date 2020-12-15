import { types } from "../Types/chatvid";
import { types as authTypes } from "../Types/auth";

let initialState: any = {
  chatvids: [],
  resChatvid: {},
  selectedChatvid: {},
  stats: {},
  mobileViewChatVid:"showChatVid"
};
const chatvidReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authTypes.LOUGOUT:
      return { ...initialState };
    case types.GET_CHATVIDS_SUCCESS:
      return { ...state, chatvids: action.payload };
    case types.GET_CHATVID_SUCCESS:
      return { ...state, resChatvid: action.payload };
    case types.SELECT_CHATVID:
      return { ...state, selectedChatvid: action.payload };
    case types.GET_ANALYTICS_CHATVID_SUCCESS:
      return { ...state, stats: action.payload };
    case types.DELETE_CHATVID_SUCCESS:
      return { ...state, chatvids: action.payload };
      case types.MOBILE_VIEW_CHAT_VID:
      return { ...state, mobileViewChatVid: action.payload };
    default: {
      return state;
    }
  }
};

export default chatvidReducer;
