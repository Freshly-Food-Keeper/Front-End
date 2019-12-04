import React from 'react';
import { connect } from 'react-redux';
import RecipeCards from '../components/Recipes/RecipeCards';
import { getFavoriteRecipes } from '../store/reducers/recipe';
import LoadingScreen from './LoadingScreen';
import { ScrollView } from 'react-native-gesture-handler';

class RecipeScreen extends React.Component {
  async componentDidMount() {
    await this.props.getFavoriteRecipes();
  }

  render() {
    const recipes = this.props.favoriteRecipes
    return recipes ? (
      <ScrollView>
        <RecipeCards {...this.props} />
      </ScrollView>
    ) : (
      <LoadingScreen />
    );
  }
}

RecipeScreen.navigationOptions = {
  title: 'My Recipes',
};

const mapStateToProps = state => ({
  favoriteRecipes: state.recipe.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  getFavoriteRecipes: () => dispatch(getFavoriteRecipes()),
  addFavoriteRecipe: (recipe) => dispatch(addFavoriteRecipe(recipe)),
  deleteFavoriteRecipe: (recipe) => dispatch(deleteFavoriteRecipe(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScreen);
