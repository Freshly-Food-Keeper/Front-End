import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const SingleRecipeCard = props => {
  const recipe = props.recipe;
  const instructions = recipe.instructions
    ? recipe.instructions
    : recipe.analyzedInstructions[0].steps.map(instruction => instruction.step);
  const ingredients = recipe.ingredients
    ? recipe.ingredients
    : [...recipe.usedIngredients, ...recipe.missedIngredients].map(
        ingredient => ingredient.original
      );
  const favoriteRecipe = {
    title: recipe.title,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
    instructions,
    ingredients,
  };

  return (
    <View>
      <Card
        title={recipe.title}
        titleStyle={{ color: '#262626', fontWeight: 'bold' }}
        image={{ uri: recipe.image }}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
          size={50}
          onPress={() => props.addFavoriteRecipe(favoriteRecipe)}
        />
        <View>
          <Text style={{ color: '#262626', fontWeight: 'bold' }}>
            Ready in {recipe.readyInMinutes} minutes {'\n'}
            Servings: {recipe.servings}
            {'\n'}
          </Text>

          <Text style={{ color: '#262626', fontWeight: 'bold' }}>
            Ingredients
          </Text>
        </View>
        <Divider />
        <View>
          {ingredients.map((ingredient, i) => (
            <Text key={i}>{ingredient}</Text>
          ))}
          <Text style={{ color: '#262626', fontWeight: 'bold' }}>
            {'\n'}Instructions
          </Text>
        </View>
        <Divider />
        <View>
          {instructions.map((step, i) => (
            <Text key={i}>{step}</Text>
          ))}
        </View>
      </Card>
    </View>
  );
};
export default SingleRecipeCard;
