import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import WelcomeScreen from './screens/WelcomeScreen';
import NewAppNavigator from './navigation/NewAppNavigator'
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NewAppNavigator />
      </Provider>
    );
  }
}
