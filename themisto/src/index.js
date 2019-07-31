import React from 'react';
import '@babel/polyfill';
import {hydrate} from 'react-dom';
import Core from './core';
import {Boundary} from './containers';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

hydrate(
    <Boundary>
      <BrowserRouter>
        <Core/>
      </BrowserRouter>
    </Boundary>
    , document.getElementById('root'));

serviceWorker.unregister();
