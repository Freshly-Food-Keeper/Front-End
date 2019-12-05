import React from 'react';
import { View, Image } from 'react-native';
import FreshlyGif from '../assets/icons/freshly_loading.gif';
import { styles } from '../styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={FreshlyGif} style={styles.gif} />
      </View>
    </View>
  );
};

export default LoadingScreen;
