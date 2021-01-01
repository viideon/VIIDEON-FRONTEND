import React, { Component } from "react";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import creatSagaMiddleware from "redux-saga";
import persistedReducer from "./Redux/Reducers";
import rootSaga from "./Redux/Sagas/index";
import Routes from "./Routes";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 4000,
  pauseOnHover: false,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
  limit: 2,
});

const sagaMiddleware = creatSagaMiddleware();
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware)
  );
} else {
  enhancer = compose(applyMiddleware(sagaMiddleware));
}

export const store = createStore(persistedReducer, {}, enhancer);
const persistor = persistStore(store);

class App extends Component {
  componentDidMount() {
    window.addEventListener("blur", () => {
      toast.dismiss();
    });
  }
  render() {
    return (
      <div className="App">
        <ToastContainer
          autoClose={2000}
          limit={3}
          style={{ zIndex: 223123123 }}
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </div>
    );
  }
}
sagaMiddleware.run(rootSaga);
export default App;
