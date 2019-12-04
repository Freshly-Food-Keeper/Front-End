import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import FreshlyGif from '../assets/icons/freshly_loading.gif';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={FreshlyGif} style={styles.gif} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  gif: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;
