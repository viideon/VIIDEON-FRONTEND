import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import registerReducer from './register';
import authReducer from './auth';
import drawerReducer from "./drawer"
import videoReducer from './videos';
import profileReducer from './profile';


const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["auth", "profile"],
    blacklist: ["video", "drawer"]
};

const videoPersistConfig = {
    key: 'video',
    storage: storage,
    whitelist: ['videos'],
    blacklist: ["isVideoUpdated", "videoSaved"]
}

const rootReducer = combineReducers({
    register: registerReducer,
    drawer: drawerReducer,
    auth: authReducer,
    video: persistReducer(videoPersistConfig, videoReducer),
    profile: profileReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default persistedReducer;


