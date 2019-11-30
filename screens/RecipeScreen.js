import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Badge, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { connect } from 'react-redux';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { getRecipesWithIngredient } from '../store';

class RecipeScreen extends Component {
  async componentDidMount() {
    await this.props.getRecipes('apple');
  }
  render() {
    const recipes = this.props.allRecipes;
    console.log('recipes', recipes);
    return recipes ? (
      <ScrollView style={styles.container}>
        {recipes.map(recipe => {
          const singleRecipe = {
            id: recipe.id,
            title: recipe.title,
            imageUrl: recipe.image,
          };

          return (
            <Card
              key={singleRecipe.id}
              containerStyle={{ padding: 0 }}
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              title={singleRecipe.title}
              titleStyle={{ color: '#262626', fontWeight: 'bold' }}
              chevron={{ color: '#262626' }}
              image={{ uri: singleRecipe.imageUrl }}
            >
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  margin: 5,
                  width: '50%',
                  backgroundColor: '#035640',
                  alignSelf: 'center',
                }}
                title="View Recipe"
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                // onPress={() =>
                //   this.props.navigation.navigate('SingleFood', singleFood)
                // }
              />
            </Card>
          );
        })}
      </ScrollView>
    ) : (
      <View />
    );
  }
}

RecipeScreen.navigationOptions = {
  title: 'My Recipes',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  allRecipes: state.recipe,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: ingredient => dispatch(getRecipesWithIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScreen);
