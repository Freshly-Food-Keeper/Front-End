import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { formatRecipe, capitalize } from '../../utils';
import { styles } from '../../styles';
import { connect } from 'react-redux';
import { addFavoriteRecipe } from '../../store';

const SingleRecipeCard = props => {
  const recipe = props.recipe;
  const formattedRecipe = formatRecipe(recipe);
  const title = capitalize(recipe.title);
  console.log('formateedRecipe', formattedRecipe);
  return (
    <View>
      <Card
        title={title}
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
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
            size={30}
            onPress={() => props.addFavRecipe(formattedRecipe)}
          />
        </View>

        <Text style={styles.subHeader}>INGREDIENTS</Text>
        <Divider style={styles.divider} />

        <View>
          {formattedRecipe.ingredients.map((ingredient, i) => (
            <Text key={i} style={styles.smallText}>
              - {ingredient}
            </Text>
          ))}

          <Text style={styles.subHeader}>INSTRUCTIONS</Text>
          <Divider style={styles.divider} />
        </View>

        <View>
          {formattedRecipe.instructions.map((step, i) => (
            <Text key={i} style={styles.smallText}>
              - {step}
            </Text>
          ))}
        </View>
      </Card>
    </View>
  );
};

const mapStateToProps = state => ({
  recipes: state.recipe.recipes.results,
  favoriteRecipes: state.recipe.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  addFavRecipe: recipe => dispatch(addFavoriteRecipe(recipe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeCard);
