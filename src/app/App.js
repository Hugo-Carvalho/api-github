import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { API_BASE_URL } from '../constants';
import './styles/App.css';

import Home from '../home/Home';

function App() {

  Axios.defaults.baseURL = API_BASE_URL;

  return (
    <div className="app">
      <div className="app-body">
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />}></Route>
          <Route exact path="/:userGithub" render={(props) => <Home {...props} />}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;