import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cjk from '../index';
import App from './app'

let store = createStore(cjk.Reducers);
let rootElement = document.getElementById('app')

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  rootElement
)