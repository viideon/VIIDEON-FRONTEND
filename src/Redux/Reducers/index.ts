import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { types } from "../../Redux/Types/auth";
import expireIn from "redux-persist-transform-expire-in";
import { persistReducer } from "redux-persist";
import registerReducer from "./register";
import authReducer from "./auth";
import drawerReducer from "./drawer";
import videoReducer from "./videos";
import profileReducer from "./profile";
import emailReducer from "./email";
import assetReducer from "./asset";
import chatvidReducer from './chatvid'
const expireTime = 24 * 60 * 60 * 1000;
const expirationKey = "expirationKey";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "email", "asset"],
  blacklist: ["drawer", "video", "profile"],
  transforms: [expireIn(expireTime, expirationKey, {})]
};

const videoPersistConfig = {
  key: "video",
  storage: storage,
  whitelist: [
    "videoCount",
    "viewCount",
    "emailShareCount",
    "emailOpenCount",
    "ctaCount",
    "watchCount",
    "singleVideo"
  ],
  blacklist: ["isVideoUpdated", "videoSaved", "videos",]
};
const profilePersistConfig = {
  key: "profile",
  storage: storage,
  blacklist: ["loading"]
};
const chatvidPersisConfig = {
  key: "chatvids",
  storage: storage,
}
const appReducer = combineReducers({
  register: registerReducer,
  drawer: drawerReducer,
  auth: authReducer,
  video: persistReducer(videoPersistConfig, videoReducer),
  profile: persistReducer(profilePersistConfig, profileReducer),
  email: emailReducer,
  asset: assetReducer,
  chatvids: persistReducer(chatvidPersisConfig, chatvidReducer)
});

const rootReducer = (state: any, action: any) => {
  if (action.type === types.LOGOUT_REQ) {
    // for all keys defined in your persistConfig(s)
    // storage.removeItem('persist:otherKey')
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default persistedReducer;
