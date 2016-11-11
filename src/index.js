import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import Images from './app/components/Images';
import MainSection from './app/components/MainSection';
import configureStore from './app/store/configureStore';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './index.scss';

const history = useRouterHistory(createHistory)({
  basename: '/'
});

const store = configureStore();

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRedirect to="/messages"/>
          <Route path="messages" component={MainSection}/>
          <Route path="images" component={Images}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
