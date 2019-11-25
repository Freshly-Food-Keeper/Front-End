import React from 'react';
import store from './store'
import InitialScreen from './screens/InitialScreen';
import PhotoPicker from './components/PhotoPicker'
import { Provider } from 'react-redux'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <InitialScreen />
      </Provider>
    )
  }
}


