import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import InitialScreen from './screens/InitialScreen';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <InitialScreen />
      </Provider>
    );
  }
}
