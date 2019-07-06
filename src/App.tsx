import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppProvider } from '@shopify/polaris';

import {Auth, Dashboard} from './routes';
import {FirebaseProvider} from './components';

import '@shopify/polaris/styles.css';
import './App.css';

const App: React.FC = () => {
  return (
    <AppProvider>
    <FirebaseProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/" component={Auth} />
        </Switch>
      </Router>
    </FirebaseProvider>
    </AppProvider>
  );
}

export default App;
