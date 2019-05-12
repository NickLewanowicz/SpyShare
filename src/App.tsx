import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import {Auth, Dashboard} from './routes'
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Dashboard} />
      <Route path="/a" component={Auth} />

    </Router>
  );
}

export default App;
