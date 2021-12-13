import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { indigo, red } from '@material-ui/core/colors';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme({
  typography: {
    fontFamily: [
      'Josefin Sans',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),

    h2: {
      fontFamily: [
        'Bubblegum Sans',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'cursive'
      ].join(','),
    }
  },
  palette: {
    primary: indigo,
    secondary: red
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
