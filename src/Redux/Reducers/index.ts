import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import registerReducer from './register';
import authReducer from './auth';
import videoReducer from './videos';
import profileReducer from './profile';


const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["auth"]
};

const rootReducer = combineReducers({
    register: registerReducer,
    auth: authReducer,
    video: videoReducer,
    profile: profileReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default persistedReducer;


