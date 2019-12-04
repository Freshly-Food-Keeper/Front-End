import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Avatar, ButtonGroup, Icon } from 'react-native-elements';
import NutritionInfo from '../components/NutritionInfo';
import AddFoodForm from '../components/AddFoodForm';
import Dialog from 'react-native-popup-dialog';
import { SingleFoodScreen } from '.';
import { connect } from 'react-redux';
import { addFood } from '../store/reducers/food';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ButtonGroup } from 'react-native-elements';
import NutritionInfo from '../components/Food/NutritionInfo';
import RecipeComponent from '../components/Recipes/RecipeComponent';

class SingleItemScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      editVisible: false
    };
    this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ _handlePressEdit: this._handlePressEdit });
  }

  updateSelectedIndex(index) {
    this.setState({ selectedIndex: index });
  }

  _handlePressEdit = () => {
    this.setState({ editVisible: !this.state.editVisible })
  }

  static navigationOptions = (props) => {
    return {
      editVisible: false,
      title: 'My Profile!',
      headerRight: (
        <Icon
          name="edit"
          type="font-awesome"
          color="black"
          onPress={props.navigation.getParam('_handlePressEdit')}
        />
      )
    }
  }

  render() {
    const navigation = this.props.navigation;
    const food = {
      id: navigation.getParam('id'),
      expiresIn: navigation.getParam('expiresIn'),
      imageUrl: navigation.getParam('imageUrl'),
      name: navigation.getParam('name'),
    };
    const buttons = ['Recipes', 'Nutrition'];
    return (
      <View style={styles.container}>
        <View>
          <Dialog
            containerStyle={styles.dialogContainer}
            visible={this.state.editVisible}
            onTouchOutside={() => {
              editVisible = false;
            }}
          >
          <AddFoodForm
            food={food}
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
          <Text style={styles.subTitle}>{food.expiresIn}</Text>
        </View>
        <View>
          <ButtonGroup
            style={styles.buttonGroup}
            onPress={this.updateSelectedIndex}
            selectedButtonStyle={{ backgroundColor: '#ED6A5A' }}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            buttonStyle={styles.button}
            containerStyle={{ height: 25 }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 5,
    margin: 0,
    fontSize: 30,
    color: 'black',
  },
  subTitle: {
    paddingTop: 5,
    margin: 0,
    fontSize: 20,
    color: 'gray',
  },
  buttonGroup: {
    borderRadius: 5,
    margin: 15,
    width: '50%',
    backgroundColor: '#035640',
    alignSelf: 'center',
  },
  editIcon: {
    alignSelf: 'flex-end'
  }
});

const mapDispatchToProps = dispatch => ({
  addFood: food => dispatch(addFood(food)),
});

export default connect(null, mapDispatchToProps)(SingleItemScreen);
