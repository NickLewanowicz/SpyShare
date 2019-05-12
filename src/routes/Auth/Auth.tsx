import React from 'react';

import { Route } from "react-router-dom";

import {Login, Signup} from './components'

function Auth() {
    return <>
        <Route path='/login' exact component={Login}/>
        <Route path='/signup' exact component={Signup}/>
    </>
}

export default Auth
