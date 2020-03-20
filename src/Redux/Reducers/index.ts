import { combineReducers } from 'redux'
import registerReducer from './register';
import authReducer from './auth';
import videoReducer from './videos';
import profileReducer from './profile';


export default combineReducers({
    register: registerReducer,
    auth: authReducer,
    video: videoReducer,
    profile: profileReducer,
});