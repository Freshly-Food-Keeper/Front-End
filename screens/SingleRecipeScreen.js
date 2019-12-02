import React, { Component } from 'react';
import { Text, Card, Divider } from 'react-native-elements';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

class SingleRecipeScreen extends Component {
  render() {
    const recipes = this.props.recipes;
    const _recipe = this.props.navigation.getParam('recipe');
    const selectedRecipe = _recipe.recipe;
    const filteredRecipe = recipes.filter(
      result => result.id === selectedRecipe.id
    );
    const recipe = filteredRecipe[0];
    const instructions = recipe.analyzedInstructions[0].steps;
    const ingredients = [
      ...recipe.usedIngredients,
      ...recipe.missedIngredients,
    ];

    return (
      <ScrollView>
        <Card
          title={recipe.title}
          titleStyle={{ color: '#262626', fontWeight: 'bold' }}
          image={{ uri: recipe.image }}
        >
          <Text style={{ color: '#262626', fontWeight: 'bold' }}>
            Ready in {recipe.readyInMinutes} minutes {'\n'}
            Servings: {recipe.servings}
            {'\n'}
          </Text>

          <Text style={{ color: '#262626', fontWeight: 'bold' }}>
            Ingredients
          </Text>

          <Divider />

          {ingredients.map(ingredient => {
            return <Text key={ingredient.id}>{ingredient.original}</Text>;
          })}

          <Text style={{ color: '#262626', fontWeight: 'bold' }}>
            {'\n'}Instructions
          </Text>
          <Divider />

          {instructions.map(instruction => {
            return (
              <Text key={instruction.number}>
                {instruction.number}: {instruction.step}
                {'\n'}
              </Text>
            );
          })}
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes.results,
});

export default connect(mapStateToProps)(SingleRecipeScreen);