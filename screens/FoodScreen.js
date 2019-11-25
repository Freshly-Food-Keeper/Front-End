import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

const foods = [
  {
    id: 2, 
    name: 'apple',
    expiresIn: 14,
    imageUrl: 'https://spoonacular.com/cdn/ingredients_250x250/apple.jpg'
  },
  {
    id: 3, 
    name: 'orange',
    expiresIn: 7,
    imageUrl: 'https://spoonacular.com/cdn/ingredients_250x250/orange.jpg'
  },
  {
    id: 5, 
    name: 'blueberries',
    expiresIn: 2,
    imageUrl: 'https://spoonacular.com/cdn/ingredients_250x250/blueberries.jpg',
  },
]

const dayCalculator = (days) => {
  if(days <= 0) {
    return 'Expired'
  } 
  
  if(days === 1) {
    return `Expires in 1 day`
  }
  
  if(days < 7) {
    return `Expires in ${days} days`
  }
  
  if(days === 7) {
    return `Expires in 1 week`
  }
  
  if(days < 29) {
    return `Expires in ${Math.round(days / 7)} weeks`
  }
  
  if(days === 29) {
    return `Expires in 1 month`
  }
  
  if(days < 365) {
    return `Expires in ${Math.round( days / 30)} months`
  }
  
  if(days === 365) {
    return `Expires in 1 year`
  }
}


export default function FoodScreen() {
  return (
    <View style={styles.container}>
      {foods.map(food => (
        <ListItem
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          leftAvatar={{ rounded: true }}
          title="food.name"
          titleStyle={{ color: '#262626', fontWeight: 'bold' }}
          subtitle="Expires in ..."
          subtitleStyle={{ color: '#262626' }}
          chevron={{ color: '#262626' }}
        />
      ))}
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