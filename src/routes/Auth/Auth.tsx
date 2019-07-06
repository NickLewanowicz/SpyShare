import React from 'react';

import { Route } from "react-router-dom";

import {Login, Register, Signup} from './components'

function Auth() {
    return <>
        <Route path='/login' exact component={Login}/>
        <Route path='/signup' exact component={Signup}/>
        <Route path='/register' exact component={Register}/>
    </>
}

export default Auth
