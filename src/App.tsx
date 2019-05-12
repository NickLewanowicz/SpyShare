import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {Auth, Dashboard} from './routes'
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/" component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
