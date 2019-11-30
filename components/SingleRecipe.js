import React, { Component } from 'react';
import { Card, Button } from 'react-native-elements';
import TouchableScale from 'react-native';
import { connect } from 'react-redux';
import { getRecipeInstructions } from '../store';

class SingleRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: '',
    };
  }
  async componentDidMount() {
    await this.props.getRecipe('324694');
  }
  render() {
    return (
      <Card
        containerStyle={{ padding: 0 }}
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        title="hi"
        titleStyle={{ color: '#262626', fontWeight: 'bold' }}
        chevron={{ color: '#262626' }}
        // image={{ uri: props.recipe.image }}
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
  }
}

const mapStateToProps = state => ({
  allRecipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  getRecipe: id => dispatch(getRecipeInstructions(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
