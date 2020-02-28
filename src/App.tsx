import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/layout/footer';
import Home from './components/home';
import Pages from './components/Pages';
import AboutUs from './components/aboutUs/index';
import Welcome from './components/layout/welcome';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/welcome" component={Welcome} />

          <Route path="*" component={Pages} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
