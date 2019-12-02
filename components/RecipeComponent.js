import React, { Component } from 'react';
import { ScrollView, StyleSheet, Title, Text } from 'react-native';
import { connect } from 'react-redux';
import { getRecipesWithIngredient } from '../store';

import { Card, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { titleCase } from '../utils';

class RecipeComponent extends Component {
  async componentDidMount() {
    const food = this.props.food;
    await this.props.getRecipes(food.name);
  }
  render() {
    const recipes = this.props.allRecipes.results;
    const navigation = this.props.navigation;
    return recipes ? (
      <ScrollView>
        {recipes.map(recipe => {
          console.log(recipe)
          return (
            <Card
              key={recipe.id}
              containerStyle={{ padding: 0 }}
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              title={titleCase(recipe.title)}
              titleStyle={{ color: '#262626', fontWeight: 'bold' }}
              chevron={{ color: '#262626' }}
              image={{ uri: recipe.image }}
            >
              <Text>Ready In {recipe.readyInMinutes} Minutes </Text>
              <Text>Servings: {recipe.servings} </Text>
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  margin: 5,
                  width: '50%',
                  backgroundColor: '#035640',
                  alignSelf: 'center',
                }}
                title="View Recipe"
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                onPress={() =>
                  navigation.navigate('SingleRecipe', { recipe: { recipe } })
                }
              />
            </Card>
          );
        })}
      </ScrollView>
    ) : null;
  }
}

const mapStateToProps = state => ({
  allRecipes: state.recipe.recipes,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: ingredient => dispatch(getRecipesWithIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
