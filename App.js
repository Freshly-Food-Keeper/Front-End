import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
