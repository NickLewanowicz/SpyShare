import React from 'react';

export const FirebaseContext = React.createContext({});

export const useFirebase = () => React.useContext(FirebaseContext);