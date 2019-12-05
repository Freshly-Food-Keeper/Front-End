import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  getAllInventory,
  addFood,
  deleteFood,
  updateFoodStatus
} from '../store/reducers/food'
import { getWastedPercentage } from '../store/reducers/dataVisuals'
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter
} from 'react-native-popup-dialog'
import { sortFoodsByExpirationDate, sortFoodsAlphabetically } from '../utils'
import LoadingScreen from './LoadingScreen'

import FoodList from '../components/Food/FoodList'

class FoodScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      editVisible: false
    }
    this.renderStatusDialog = this.renderStatusDialog.bind(this)
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this)
    this.onLongPress = this.onLongPress.bind(this)
  }

  componentDidMount() {
    this.props.getInventory()
  }

  async handleStatusUpdate(food, selectedButton) {
    switch (selectedButton) {
      case 'Eaten':
        await this.props.updateFoodStatus(food.id, selectedButton)
        break
      case 'Thrown Away':
        await this.props.updateFoodStatus(food.id, selectedButton)
        break
      case 'Delete':
        this.props.deleteFood(food.id)
        break
      default:
        break
    }
    this.setState({
      editVisible: false,
      selectedFood: {}
    })
    this.props.getWastedPercentage()
  }

  onLongPress(visible, selectedFood) {
    this.setState({
      editVisible: !visible,
      selectedFood
    })
  }

  renderStatusDialog() {
    const food = this.state.selectedFood
    if (food) {
      return (
        <Dialog
          visible={!!this.state.editVisible}
          onTouchOutside={() => {
            this.setState({ editVisible: false })
          }}
          footer={
            <DialogFooter>
              <DialogButton
                text='Thrown Away'
                onPress={() => {
                  this.handleStatusUpdate(food, 'Thrown Away')
                }}
              />
              <DialogButton
                text='Eaten'
                onPress={() => {
                  this.handleStatusUpdate(food, 'Eaten')
                }}
              />
              <DialogButton
                text='Delete'
                onPress={() => {
                  this.handleStatusUpdate(food, 'Delete')
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent style={{ width: 300 }}>
            <Text>{food.name}</Text>
          </DialogContent>
        </Dialog>
      )
    } else {
      return <View />
    }
  }

  render() {
    let foods = this.props.allFoods
    const routeName = this.props.navigation.state.routeName
    const navigation = this.props.navigation

    // Sort by Expiration Date if we're on the UserHomeScreen. Doing in front end so we don't have to query the database every time a user switches screens
    routeName === 'UserHome'
      ? (foods = sortFoodsByExpirationDate(foods))
      : (foods = sortFoodsAlphabetically(foods))

    return foods.length > 0 ? (
      <FoodList
        foods={foods}
        renderStatusDialog={this.renderStatusDialog}
        onLongPress={this.onLongPress}
        visible={this.state.editVisible}
        navigation={navigation}
      />
    ) : (
      <LoadingScreen />
    )
  }
}

FoodScreen.navigationOptions = {
  title: 'My Food'
}

const mapStateToProps = state => ({
  allFoods: state.food
})

const mapDispatchToProps = dispatch => ({
  getInventory: () => dispatch(getAllInventory()),
  addFood: food => dispatch(addFood(food)),
  deleteFood: id => dispatch(deleteFood(id)),
  updateFoodStatus: (id, status) => dispatch(updateFoodStatus(id, status)),
  getWastedPercentage: () => dispatch(getWastedPercentage())
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen)
