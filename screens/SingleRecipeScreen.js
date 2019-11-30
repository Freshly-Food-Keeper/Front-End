import React, { Component } from 'react';
import { Text, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getRecipeInstructions } from '../store';

class SingleRecipeScreen extends Component {
  async componentDidMount() {
    const _recipe = this.props.navigation.getParam('recipe');
    const recipe = _recipe.recipe;
    await this.props.getRecipe(recipe.id);
    // console.log('instructions', instructions);
  }
  render() {
    const _recipe = this.props.navigation.getParam('recipe');
    const recipe = _recipe.recipe;
    const instructions = this.props.instructions;
    console.log('recipe', this.props.recipe);
    console.log('instructions', instructions);
    const steps = [];

    instructions.forEach(instruction => steps.push(instruction));
    console.log('steps');

    return (
      <Card
        title={recipe.title}
        titleStyle={{ color: '#262626', fontWeight: 'bold' }}
        image={{ uri: recipe.image }}
        divider
      />
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe.recipe,
  instructions: state.recipe.instructions,
});

const mapDispatchToProps = dispatch => ({
  getRecipe: id => dispatch(getRecipeInstructions(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeScreen);
