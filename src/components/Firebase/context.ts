import React from 'react';

import Firebase from './firebase'

export const FirebaseContext = React.createContext<Firebase | null>(null);

export const useFirebase = () => React.useContext(FirebaseContext);