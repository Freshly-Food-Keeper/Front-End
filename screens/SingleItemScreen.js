import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import NutritionInfo from '../components/NutritionInfo'



export default class SingleItemScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.freshly}>Nutrition Component</Text>
            <NutritionInfo />
          </View>
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