import React from 'react';
import { Platform, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { styles } from '../../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { addFavoriteRecipe } from '../../store';
import { formatRecipe } from '../../utils';

const RecipeCard = props => {
  const navigation = props.navigation;
  const formattedRecipe = formatRecipe(props.recipe);

  return (
    <Card
      containerStyle={{ padding: 0 }}
      friction={90}
      tension={100}
      activeScale={0.95}
      title={formattedRecipe.title}
      titleStyle={styles.cardTitle}
      chevron={{ color: '#262626' }}
      image={{ uri: formattedRecipe.image }}
      imageStyle={styles.cardImage}
    >
      <View style={styles.row}>
        <Button
          buttonStyle={styles.cardButton}
          title="View Recipe"
          titleStyle={styles.buttonTitle}
          onPress={() =>
            navigation.navigate('SingleRecipe', { recipe: { formattedRecipe } })
          }
        />
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
          size={30}
          onPress={() => props.addFavRecipe(formattedRecipe)}
          style={styles.icon}
        />
      </View>
    </Card>
  );
};
const mapStateToProps = state => ({
  recipes: state.recipe.recipes.results,
  favoriteRecipes: state.recipe.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  addFavRecipe: recipe => dispatch(addFavoriteRecipe(recipe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
