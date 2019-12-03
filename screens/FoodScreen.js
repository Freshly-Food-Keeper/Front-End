import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { ListItem, Badge, Avatar, Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale' // https://github.com/kohver/react-native-touchable-scale
import { connect } from 'react-redux'
import {
  getAllInventory,
  addFood,
  deleteFood,
  updateFood
} from '../store/reducers/food'
import { getWastedPercentage } from '../store/reducers/dataVisuals'
import AddFoodForm from '../components/AddFoodForm'
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter
} from 'react-native-popup-dialog'
import { titleCase, dayCalculator } from '../utils'
import LoadingScreen from './LoadingScreen'

class FoodScreen extends Component {
  constructor() {
    super()
    this.state = {
      editVisible: false
    }
    this.renderStatusDialog = this.renderStatusDialog.bind(this)
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this)
  }

  componentDidMount() {
    this.props.getInventory()
  }

  handleStatusUpdate(food, selectedButton) {
    switch (selectedButton) {
      case 'Eaten':
      case 'Thrown Away':
        this.props.updateFood(food.id, selectedButton)
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
    let foods = this.props.allFoods || []
    // Sort by Expiration Date if we're on the UserHomeScreen. Doing in front end so we don't have to query the database every time a user switches screens
    if (this.props.navigation.state.routeName === 'UserHome') {
      //sort numerically by expiration days
      foods.sort((a, b) => a.expiresIn - b.expiresIn)

      //Only allow 4 items to be shown
      let tempArray = []
      let count = 0
      while (count < 4 && foods.length > count) {
        tempArray.push(foods[count])
        count++
      }
      foods = [...tempArray]
    } else {
      //sort alphabetically by name
      foods.sort((a, b) => (a.name > b.name ? 1 : -1))
    }

    return foods.length > 0 ? (
      <View style={styles.foodContainer}>
        {this.renderStatusDialog()}
        {foods.map(food => {
          // Creating a new object here so that the calculations we do can also easily be sent to the Single Food View
          const singleFood = {
            id: food.id,
            name: titleCase(food.name),
            expiresIn: dayCalculator(food.expiresIn),
            imageUrl: food.imageUrl
          }
          return (
            <View key={food.id}>
              <ListItem
                key={singleFood.id}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                leftAvatar={
                  <AvatarComponent food={food} showBadge={food.expiresIn < 7} />
                }
                title={singleFood.name}
                onLongPress={() =>
                  this.setState({
                    editVisible: !this.state.editVisible,
                    selectedFood: singleFood
                  })
                }
                titleStyle={{ color: '#262626', fontWeight: 'bold' }}
                subtitle={singleFood.expiresIn}
                subtitleStyle={{ color: '#262626' }}
                chevron={{ color: '#262626' }}
                onPress={() =>
                  this.props.navigation.navigate('SingleFood', singleFood)
                }
                bottomDivider
              />
            </View>
          )
        })}
      </View>
    ) : (
      <LoadingScreen />
    )
  }
}

FoodScreen.navigationOptions = {
  title: 'My Food'
}

const styles = StyleSheet.create({
  foodContainer: {
    flex: 1
  },
  noFoodContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    paddingTop: 5,
    margin: 0,
    fontSize: 30,
    color: 'black'
  },
  subTitle: {
    paddingTop: 5,
    margin: 0,
    fontSize: 20,
    color: 'gray'
  }
})

// If a user has no food to display, show them a friendly message!
function NoFoodComponent() {
  return (
    <View style={styles.noFoodContainer}>
      <Text style={styles.title}>Hi! Welcome to Freshly!</Text>
      <Text style={styles.subTitle}>Why don't you add some food?</Text>
      <Image
        style={{ width: 90, height: 300, marginTop: 40 }}
        source={require('../assets/images/arrow.png')}
      />
    </View>
  )
}

/* Add style and logic to avatar (left image). If no image, use default. If expiration date
is less than 7 days, add red badge */
function AvatarComponent({ food, showBadge }) {
  return (
    <View>
      <Avatar
        size='small'
        rounded
        source={
          food.imageUrl === null
            ? require('../assets/images/food-placeholder.jpg')
            : { uri: food.imageUrl }
        }
      />
      {showBadge && (
        <Badge
          status='error'
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      )}
    </View>
  )
}

const mapStateToProps = state => ({
  allFoods: state.food
})

const mapDispatchToProps = dispatch => ({
  getInventory: () => dispatch(getAllInventory()),
  addFood: food => dispatch(addFood(food)),
  deleteFood: id => dispatch(deleteFood(id)),
  updateFood: (id, status) => dispatch(updateFood(id, status)),
  getWastedPercentage: () => dispatch(getWastedPercentage())
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen)
