import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import creatSagaMiddleware from 'redux-saga';
// import Footer from './components/layout/footer';
import Home from '../src/Screens/Home/Home';
import SignIn from '../src/Screens/SIgnIn/SignIn';
import SignUp from '../src/Screens/SignUp/SignUp';
// import Pages from './components/Pages';
// import AboutUs from './components/aboutUs/index';
// import Welcome from './components/layout/welcome';
import rootReducer from './Redux/Reducers';
import rootSaga from './Redux/Sagas/index';
import VideoTab from './Screens/VideoTab/VideoTab';
import Profile from './Screens/Profile/index';

const sagaMiddleware = creatSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/videotab" component={VideoTab} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/Home" component={Home} /> */}

            {/* <Route path="/aboutus" component={AboutUs} />
          <Route path="/welcome" component={Welcome} />

          <Route path="*" component={Pages} /> */}
          </Switch>
          {/* <Footer /> */}
        </Router>
      </Provider>
    </div>
  );
};
sagaMiddleware.run(rootSaga);
export default App;