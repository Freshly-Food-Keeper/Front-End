import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getFavoriteRecipes } from '../store';
import RecipeCards from '../components/RecipeCards';

class RecipeScreen extends Component {
  async componentDidMount() {
    await this.props.getFavoriteRecipes();
    console.log(this.props.getFavoriteRecipes());
  }
  render() {
    console.log('recipes', this.props.recipes);
    // const navigation = this.props.navigation;
    // const recipes = this.props.recipe.favoriteRecipes;
    return <Text>Fav recipes</Text>;
    // return recipes ? (
    //   <RecipeCards recipes={recipes} navigation={navigation} />
    // ) : (
    //   <View />
    // );
  }
}

RecipeScreen.navigationOptions = {
  title: 'My Recipes',
};

const mapStateToProps = state => ({
  recipes: state.recipe,
});

const mapDispatchToProps = dispatch => ({
  getFavoriteRecipes: () => dispatch(getFavoriteRecipes),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScreen);
