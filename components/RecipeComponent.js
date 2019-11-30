import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { getRecipesWithIngredient } from '../store';

import { Card, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

class RecipeComponent extends Component {
  async componentDidMount() {
    await this.props.getRecipes('apple');
  }
  render() {
    const recipes = this.props.allRecipes;
    // console.log('recipes', recipes);

    return recipes ? (
      <ScrollView style={styles.container}>
        {recipes.map(recipe => {
          return (
            <Card
              key={recipe.id}
              containerStyle={{ padding: 0 }}
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              title={recipe.title}
              titleStyle={{ color: '#262626', fontWeight: 'bold' }}
              chevron={{ color: '#262626' }}
              image={{ uri: recipe.image }}
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
              />
            </Card>
          );
        })}
      </ScrollView>
    ) : (
      <Text>Loading</Text>
    );
  }
}

const mapStateToProps = state => ({
  allRecipes: state.recipe,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: ingredient => dispatch(getRecipesWithIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
