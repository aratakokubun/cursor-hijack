import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import { Reducers } from './reducer/reducers'

import SampleButton from './sample-button';

let store = createStore(Reducers);
let rootElement = document.getElementById('app')

render(
  <Provider store={store}>
    <div>
      <App />
      <SampleButton />
    </div>
  </Provider>,
  rootElement
)