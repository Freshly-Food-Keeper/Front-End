import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getRecipesWithIngredient } from '../store';
import RecipeCards from './RecipeCards';
import LoadingScreen from '../screens/LoadingScreen';

class RecipeComponent extends React.Component {
  async componentDidMount() {
    const food = this.props.food;
    await this.props.getRecipes(food.name);
  }
  render() {
    const recipes = this.props.allRecipes.results;
    const navigation = this.props.navigation;
    return recipes ? (
      <ScrollView>
        <RecipeCards recipes={recipes} navigation={navigation} />
      </ScrollView>
    ) : (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = state => ({
  allRecipes: state.recipe.recipes,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: ingredient => dispatch(getRecipesWithIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);
