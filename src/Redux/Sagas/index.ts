import { fork, all } from 'redux-saga/effects';
import { registerhWatcher } from './register/index';
import { authWatcher } from './auth/index';


export default function* rootSaga() {
    yield all([
        fork(registerhWatcher),
        fork(authWatcher),
    ])
}