import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addFavoriteRecipe, getFavoriteRecipes } from '../store';
import SingleRecipeCard from '../components/Recipes/SingleRecipeCard';

class SingleRecipeScreen extends React.Component {
  async componentDidMount() {
    await this.props.getFavoriteRecipes();
  }
  render() {
    const recipe = this.props.navigation.getParam('recipe').recipe;
    return (
      <View style={styles.container}>
        <ScrollView>
          <SingleRecipeCard recipe={recipe} addFavoriteRecipe={this.props.addFavoriteRecipe} favoriteRecipes={this.props.favoriteRecipes}/>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes.results,
  favoriteRecipes: state.recipe.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  addFavoriteRecipe: recipe => dispatch(addFavoriteRecipe(recipe)),
  getFavoriteRecipes: () => dispatch(getFavoriteRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
});
