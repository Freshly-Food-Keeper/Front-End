import React from 'react';
import { Text, View, Button } from 'react-native';
import AddFoodForm from '../components/Forms/AddFoodForm';
import Dialog from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { addFood } from '../store/reducers/food';
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

  componentDidMount() {
    this.props.navigation.setParams({ handlePressEdit: this.handlePressEdit });
  }

  updateSelectedIndex(index) {
    this.setState({ selectedIndex: index });
  }

  handlePressEdit = () => {
    this.setState({ editVisible: !this.state.editVisible });
  };

  static navigationOptions = props => {
    return {
      editVisible: false,
      title: 'My Profile',
      headerRight: (
        <Button
          title="Edit"
          onPress={props.navigation.getParam('handlePressEdit')}
        />
      ),
    };
  };

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
        <View>
          <Dialog
            containerStyle={styles.dialogContainer}
            visible={this.state.editVisible}
            onTouchOutside={this.handlePressEdit}
          >
            <AddFoodForm
              name={food.name}
              expiresIn={dayCalculator(food.expiresIn)}
              navigation={navigation}
              addFood={this.props.addFood}
            />
          </Dialog>
        </View>
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
          <Text style={styles.smallText}>{food.expiresIn}</Text>
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

const mapDispatchToProps = dispatch => ({
  addFood: food => dispatch(addFood(food)),
});

export default connect(null, mapDispatchToProps)(SingleItemScreen);
