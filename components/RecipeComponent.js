import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getRecipesWithIngredient } from '../store';
import RecipeCards from './RecipeCards';

class RecipeComponent extends Component {
  async componentDidMount() {
    await this.props.getRecipes('apple');
  }
  render() {
    const recipes = this.props.allRecipes;
    console.log('recipes', recipes);

    return <RecipeCards recipes={recipes} />;
  }
}

const mapStateToProps = state => ({
  allRecipes: state.recipe,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: ingredient => dispatch(getRecipesWithIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);
