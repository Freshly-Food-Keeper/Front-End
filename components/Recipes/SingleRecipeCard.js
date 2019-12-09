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
import LoadingScreen from '../../screens/LoadingScreen';

class SingleRecipeCard extends React.Component {
  async componentDidMount() {
    await this.props.getFavorites();
  }

  render() {
    const favoriteRecipes = this.props.favoriteRecipes;
    const recipe = this.props.recipe;
    const favoriteRecipesIds = favoriteRecipes.map(rec => rec.apiId);
    const isFavorite = favoriteRecipesIds.includes(recipe.apiId);
    return recipe ? (
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
                  this.props.deleteFavRecipe(recipe.apiId);
                }}
              />
            ) : (
              <Ionicons
                name={
                  Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'
                }
                size={30}
                onPress={() => {
                  this.props.addFavRecipe(recipe);
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
    ) : (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipe.recipes,
    favoriteRecipes: state.recipe.favoriteRecipes,
  };
};

const mapDispatchToProps = dispatch => ({
  getFavorites: () => dispatch(getFavoriteRecipes()),
  addFavRecipe: recipe => dispatch(addFavoriteRecipe(recipe)),
  deleteFavRecipe: recipeId => dispatch(deleteFavoriteRecipe(recipeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeCard);
