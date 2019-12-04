import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import RecipeCards from './RecipeCards';
import LoadingScreen from '../../screens/LoadingScreen';
import { getRecipesWithIngredient } from '../../store';

class RecipeComponent extends React.Component {
  async componentDidMount() {
    const food = this.props.food;
    await this.props.getRecipes(food.name);
  }
  render() {
    const recipes = this.props.allRecipes.results;
    const navigation = this.props.navigation;
    return recipes ? (
      <ScrollView contentInset={{ top: 0, left: 0, bottom: 225, right: 0 }}>
        <RecipeCards recipes={recipes} navigation={navigation} />
      </ScrollView>
    ) : (
      <LoadingScreen />
    )
  }
}

const mapStateToProps = state => ({
  allRecipes: state.recipe.recipes,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: ingredient => dispatch(getRecipesWithIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);
