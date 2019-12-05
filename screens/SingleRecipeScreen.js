import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import SingleRecipeCard from '../components/Recipes/SingleRecipeCard';
const SingleRecipeScreen = props => {
  console.log('HI');
  const recipe = props.navigation.getParam('recipe').formattedRecipe;
  console.log('single recipe card', recipe);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SingleRecipeCard recipe={recipe} />
      </ScrollView>
    </View>
  );
};

export default SingleRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
});
