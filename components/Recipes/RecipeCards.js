import React from 'react';
import { ScrollView } from 'react-native';
import RecipeCard from './RecipeCard';
import { styles } from '../../styles';

const RecipeCards = props => {
  const recipes = props.recipes;
  const navigation = props.navigation;
  const addFavoriteRecipe = props.addFavoriteRecipe;
  return (
    <ScrollView style={styles.flex}>
      {recipes.map(recipe => {
        return (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            navigation={navigation}
            addFavoriteRecipe={addFavoriteRecipe}
          />
        );
      })}
    </ScrollView>
  );
};
export default RecipeCards;
