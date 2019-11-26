import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'react-native-elements';
import { connect } from 'react-redux';
import NewAppNavigator from '../navigation/NewAppNavigator';
import { theme } from '../theme';
import HomeScreen from './WelcomeScreen';

const InitialScreen = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else if (props.isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        </View>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NewAppNavigator>
            <HomeScreen />
          </NewAppNavigator>
        </View>
      </ThemeProvider>
    );
  }
};

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('../assets/logos/circle.png'),
      require('../assets/logos/logo.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      avenir: require('../assets/fonts/Avenir.otf'),
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

export default connect(mapState)(InitialScreen);
