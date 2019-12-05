import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import AddFormScreen from './AddFormScreen';
import Dialog from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { addFood, updateFoodLife } from '../store/reducers/food';
import { Avatar, ButtonGroup } from 'react-native-elements';
import NutritionInfo from '../components/Food/NutritionInfo';
import RecipeComponent from '../components/Recipes/RecipeComponent';
import { styles } from '../styles';
import { dayCalculator } from '../utils';


class SingleItemScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      editVisible: false,
    };
    this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
  }

  updateSelectedIndex(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    const navigation = this.props.navigation;
    const food = {
      id: navigation.getParam('id'),
      expiresIn: navigation.getParam('expiresIn'),
      imageUrl: navigation.getParam('imageUrl'),
      name: navigation.getParam('name'),
    };
    const buttons = ['RECIPES', 'NUTRITION'];
    return (
      <View style={styles.flex}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="large"
            rounded
            source={
              food.imageUrl === null
                ? require('../images/food-placeholder.jpg')
                : { uri: food.imageUrl }
            }
          />
          <Text style={styles.title}>{food.name}</Text>
          <Text style={styles.smallText}>{dayCalculator(food.expiresIn)}</Text>
        </View>
        <View>
          <ButtonGroup
            style={styles.buttonGroup}
            onPress={this.updateSelectedIndex}
            selectedButtonStyle={{ backgroundColor: '#ED6A5A' }}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            buttonStyle={{ backgroundColor: 'white' }}
            containerStyle={{ height: 30 }}
            textStyle={styles.buttonTitle}
          />
          {this.state.selectedIndex === 0 ? (
            <RecipeComponent food={food} navigation={navigation} />
          ) : (
            <NutritionInfo food={food} />
          )}
        </View>
      </View>
    );
  }
}

SingleItemScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <Button
      onPress={() => navigation.navigate('AddForm', {
        isEdit: true,
        name: navigation.getParam('name'),
        expiresIn: navigation.getParam('expiresIn')
      })}
        title="Edit"
        color="black"
    />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addFood: food => dispatch(addFood(food)),
  updateFoodLife: (foodId, shelfLife) => dispatch(updateFoodLife(foodId, shelfLife))
});

export default connect(null, mapDispatchToProps)(SingleItemScreen);
