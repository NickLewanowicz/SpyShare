import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Dashboard} from './routes'
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Dashboard} />
    </Router>
  );
}

export default App;
