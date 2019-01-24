import './polyfills.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';
import store from './store/configureStore';

import './index.scss';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
