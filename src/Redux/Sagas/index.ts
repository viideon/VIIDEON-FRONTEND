import { fork, all } from 'redux-saga/effects';
import { registerhWatcher } from './register/index';
import { authWatcher } from './auth/index';
import {videoWatcher} from './videos/index';
import {profileWatcher} from './profile/index';

export default function* rootSaga() {
    yield all([
        fork(registerhWatcher),
        fork(authWatcher),
        fork(videoWatcher),
        fork(profileWatcher)
    ])
}