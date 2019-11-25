import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

export default function FoodScreen() {
  return (
    <View style={styles.container}>
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        leftAvatar={{ rounded: true }}
        title="Apple"
        titleStyle={{ color: '#262626', fontWeight: 'bold' }}
        subtitle="Expires in ..."
        subtitleStyle={{ color: '#262626' }}
        chevron={{ color: '#262626' }}
      />
    </View>
  );
}

FoodScreen.navigationOptions = {
  title: 'My Food',
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });