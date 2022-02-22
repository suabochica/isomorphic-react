import React from 'react';
import ReactDOM from 'reactDom';

import { App } from './App';

const render = (_App) => {
    ReactDOM.render(
        <_App/>,
        document.getElementsById('AppContainer')
    )
}

render(App);