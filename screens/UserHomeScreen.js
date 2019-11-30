import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import DataVisuals from '../components/DataVisuals';
import FoodScreen from './FoodScreen';

const theme = {
  Button: {
    titleStyle: {
      color: '#262626',
    },
  },
};

export default class UserHomeScreen extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <DataVisuals />
          <FoodScreen />
        </View>
      </ThemeProvider>
    );
  }
}

UserHomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  freshly: {
    padding: 0,
    margin: 0,
    fontSize: 30,
    color: 'black',
  },
  logo: {
    alignSelf: 'center',
    width: '30%',
    resizeMode: 'contain',
    marginTop: 50,
    marginBottom: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  buttons: {
    backgroundColor: 'white',
    width: 300,
    padding: 15,
    margin: 15,
  },
});
