import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { styles } from '../../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  deleteFavoriteRecipe,
} from '../../store';
import LoadingScreen from '../../screens/LoadingScreen';

class RecipeCard extends React.Component {
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    const navigation = this.props.navigation;
    const favoriteRecipes = this.props.favoriteRecipes;
    const recipe = this.props.recipe;
    const favoriteRecipesIds = favoriteRecipes.map(rec => rec.apiId);
    const isFavorite = favoriteRecipesIds.includes(recipe.apiId);

    return recipe ? (
      <Card
        containerStyle={{ padding: 0 }}
        friction={90}
        tension={100}
        activeScale={0.95}
        title={recipe.title}
        titleStyle={styles.cardTitle}
        chevron={{ color: '#262626' }}
        image={{ uri: recipe.image }}
        imageStyle={styles.cardImage}
        onPress={() =>
          navigation.navigate('SingleRecipe', { recipe: { recipe } })
        }
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
        <View style={styles.column}>
          <Button
            buttonStyle={styles.cardButton}
            title="View Recipe"
            titleStyle={styles.buttonTitle}
            onPress={() =>
              navigation.navigate('SingleRecipe', { recipe: { recipe } })
            }
          />
        </View>
      </Card>
    ) : (
      <LoadingScreen />
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  favoriteRecipes: state.recipe.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  getFavorites: () => dispatch(getFavoriteRecipes()),
  addFavRecipe: recipe => dispatch(addFavoriteRecipe(recipe)),
  deleteFavRecipe: recipeId => dispatch(deleteFavoriteRecipe(recipeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
