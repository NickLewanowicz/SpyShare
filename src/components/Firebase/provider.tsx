import React from 'react';

import {FirebaseContext} from './context'
import Firebase from './firebase';

export interface Props {
    children: React.ReactNode;
  }
  
export const FirebaseProvider = ({children}: Props) => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
        {children}
        </FirebaseContext.Provider>
      )
}