import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles';
import { connect } from 'react-redux';
import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  deleteFavoriteRecipe,
} from '../../store';

class SingleRecipeCard extends React.Component {
  componentDidMount() {
    const recipes = this.props.recipes;
    const recipe = this.props.recipe;
    console.log('SINGLE RECIPE CARD - Recipes', recipes);
    console.log('SINGLE RECIPE CARD - Recipes', recipe);
    this.props.getFavorites();
  }

  // console.log('props', props);
  render() {
    const favoriteRecipes = this.props.favoriteRecipes;
    const recipe = this.props.recipe;
    // console.log('favoriterecipes', favoriteRecipes);
    const isFavorite = favoriteRecipes.filter(
      rec => recipe.apiId === rec.apiId
    );
    // console.log('isFav', isFavorite);
    return (
      <View>
        <Card
          title={recipe.title}
          titleStyle={styles.cardTitle}
          image={{ uri: recipe.image }}
          imageStyle={styles.cardImage}
        >
          <View style={styles.row}>
            <Text style={styles.smallText}>
              Ready in {recipe.readyInMinutes} minutes {'\n'}
              Servings: {recipe.servings}
              {'\n'}
            </Text>
            {isFavorite ? (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                size={30}
                onPress={() => {
                  // console.log(recipe.id);
                  this.props.deleteFavRecipe(recipe.id);
                }}
              />
            ) : (
              <Ionicons
                name={
                  Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'
                }
                size={30}
                onPress={() => {
                  this.props.addFavoriteRecipe(recipe);
                }}
              />
            )}
          </View>

          <Text style={styles.subHeader}>INGREDIENTS</Text>
          <Divider style={styles.divider} />

          <View>
            {recipe.ingredients.map((ingredient, i) => (
              <Text key={i} style={styles.smallText}>
                - {ingredient}
              </Text>
            ))}

            <Text style={styles.subHeader}>INSTRUCTIONS</Text>
            <Divider style={styles.divider} />
          </View>

          <View>
            {recipe.instructions.map((step, i) => (
              <Text key={i} style={styles.smallText}>
                - {step}
              </Text>
            ))}
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    recipes: state.recipe.recipes,
    favoriteRecipes: state.recipe.favoriteRecipes,
    selectedRecipe: state.recipe.selectedRecipe,
  };
};

const mapDispatchToProps = dispatch => ({
  getFavorites: () => dispatch(getFavoriteRecipes()),
  addFavRecipe: recipe => dispatch(addFavoriteRecipe(recipe)),
  deleteFavRecipe: recipeId => dispatch(deleteFavoriteRecipe(recipeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeCard);
