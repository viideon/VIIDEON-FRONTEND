import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import creatSagaMiddleware from 'redux-saga';
import rootReducer from './Redux/Reducers';
import rootSaga from './Redux/Sagas/index';
import Routes from './Routes';

const sagaMiddleware = creatSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));


class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Routes />
        </Provider>
      </div>
    );
  }
};
sagaMiddleware.run(rootSaga);
export default App;
// export default App;