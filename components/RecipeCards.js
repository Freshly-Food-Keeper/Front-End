import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import RecipeCard from './RecipeCard';

const RecipeCards = props => {
  const recipes = props.recipes;
  return (
    <ScrollView style={styles.container}>
      {recipes.map(recipe => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </ScrollView>
  );
};
export default RecipeCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
