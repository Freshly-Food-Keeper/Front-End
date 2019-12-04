import React from 'react';
import { StyleSheet, View } from 'react-native';
import DataVisuals from '../components/Data/DataVisuals';
import FoodScreen from './FoodScreen';

export default class UserHomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DataVisuals />
        <FoodScreen navigation={this.props.navigation} />
      </View>
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
});
