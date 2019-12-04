import React from 'react';
import { connect } from 'react-redux';
import RecipeCards from '../components/RecipeCards';
import { getFavoriteRecipes } from '../store/reducers/recipe';
import LoadingScreen from './LoadingScreen';
import { ScrollView } from 'react-native-gesture-handler';

class RecipeScreen extends React.Component {
  async componentDidMount() {
    await this.props.getFavoriteRecipes();
  }
  render() {
    const recipes = this.props.favoriteRecipes;
    const navigation = this.props.navigation;

    return recipes ? (
      <RecipeCards recipes={recipes} navigation={navigation} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScreen);
