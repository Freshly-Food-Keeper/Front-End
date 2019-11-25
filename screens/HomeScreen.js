import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';

const theme = {
  Button: {
    titleStyle: {
      color: '#262626',
    },
  },
};

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/logos/circle.png')}
            />
            <Text style={styles.freshly}>freshly</Text>

            <View style={styles.buttonContainer}>
              <Button
                title="LOGIN"
                buttonStyle={styles.buttons}
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}
              />
              <Button
                title="SIGN UP"
                buttonStyle={styles.buttons}
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}
              />
            </View>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#035640',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  freshly: {
    padding: 0,
    margin: 0,
    fontSize: 30,
    color: 'white',
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
