import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';
import {Router, Route, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './index.scss';

const history = useRouterHistory(createHistory)({
  basename: '/cq'
});

const store = configureStore();

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App}/>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
