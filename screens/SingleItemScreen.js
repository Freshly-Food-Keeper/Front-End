import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import NutritionInfo from '../components/NutritionInfo'

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
          <View style={styles.contentContainer}>
            <Text style={styles.freshly}>Nutrition Component</Text>
            <NutritionInfo />
          </View>
        </View>
      </ThemeProvider>
    );
  }
}