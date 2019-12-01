import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import RecipeCards from '../components/RecipeCards';
import { getFavoriteRecipes } from '../store/reducers/recipe';

class RecipeScreen extends Component {
  async componentDidMount() {
    await this.props.getFavoriteRecipes();
    // console.log(this.props.getFavoriteRecipes());
  }
  render() {
    const recipes = this.props.recipes;
    console.log('RECIPES', recipes);
    const navigation = this.props.navigation;

    return recipes ? (
      <RecipeCards recipes={recipes} navigation={navigation} />
    ) : (
      <View />
    );
  }
}

RecipeScreen.navigationOptions = {
  title: 'My Recipes',
};

const mapStateToProps = state => ({
  recipes: state.recipe.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  getFavoriteRecipes: () => dispatch(getFavoriteRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScreen);
