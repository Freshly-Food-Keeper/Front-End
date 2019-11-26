import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import NutritionInfo from '../components/NutritionInfo'



export default class SingleItemScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Hi</Text>
        <NutritionInfo food={this.props.food}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})


