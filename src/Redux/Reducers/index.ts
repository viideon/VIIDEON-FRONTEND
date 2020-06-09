import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import expireIn from "redux-persist-transform-expire-in";
import { persistReducer } from 'redux-persist';
import registerReducer from './register';
import authReducer from './auth';
import drawerReducer from "./drawer"
import videoReducer from './videos';
import profileReducer from './profile';
const expireTime = 24 * 60 * 60 * 1000;
const expirationKey = "expirationKey";


const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["auth", "profile"],
    blacklist: ["video", "drawer"],
    transforms: [expireIn(expireTime, expirationKey, {})]
};

// const videoPersistConfig = {
//     key: 'video',
//     storage: storage,
//     // whitelist: [],
//     blacklist: ["isVideoUpdated", "videoSaved", "videos"]
// }

const rootReducer = combineReducers({
    register: registerReducer,
    drawer: drawerReducer,
    auth: authReducer,
    // video: persistReducer(videoPersistConfig, videoReducer),
    video: videoReducer,
    profile: profileReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default persistedReducer;


