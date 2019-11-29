import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Badge, Avatar } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale' // https://github.com/kohver/react-native-touchable-scale
import { connect } from 'react-redux'
import { getAllInventory } from '../store/reducers/food'

const titleCase = title => {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export const dayCalculator = days => {
  if (days <= 0) {
    return 'Expired'
  }

  if (days === 1) {
    return `Expires in 1 day`
  }

  if (days < 7) {
    return `Expires in ${days} days`
  }

  if (days < 29) {
    const weeks = Math.round(days / 7)
    if (weeks === 1) return `Expires in 1 week`
    return `Expires in ${weeks} weeks`
  }

  if (days < 365) {
    const months = Math.round(days / 30)
    if (months === 1) return `Expires in 1 month`
    return `Expires in ${months} months`
  }

  if (days === 365) {
    return `Expires in 1 year`
  }
}

function AvatarComponent({ food, showBadge }) {
  return (
    <View>
      <Avatar
        size='small'
        rounded
        source={(food.imageUrl === null) ? require('../assets/images/food-placeholder.jpg') : {uri: food.imageUrl}}
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

class FoodScreen extends Component {
  componentDidMount() {
    this.props.getInventory()
  }
  render() {
        // console.log('props in foodscreen', this.props.navigation)

    // TODO: WHEN ROUTES GETS WORKED OUT, WE NEED TO SORT FOODS FOR HOMESCREEN VS. FOODSCREEN
    // DO SORTING HERE NOT IN BACKEND
    // console.log(this.props.navigation)
    // if (this.props.navigation.state.routeName === 'Links') {
    // } else {
    // }
    const foods = this.props.allFoods
    return foods ? (
      <View style={styles.container}>
        {foods.map(food => {
          // Creating a new object here so that the calculations we do can also easily be sent to the Single Food View
          const singleFood = {
            id: food.id,
            name: titleCase(food.name),
            expiresIn: dayCalculator(food.expiresIn),
            imageUrl: food.imageUrl
          }

          return (<ListItem
            key={singleFood.id}
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            leftAvatar={<AvatarComponent food={food} showBadge={food.expiresIn < 7} />}
            title={singleFood.name}
            titleStyle={{ color: '#262626', fontWeight: 'bold' }}
            subtitle={singleFood.expiresIn}
            subtitleStyle={{ color: '#262626' }}
            chevron={{ color: '#262626' }}
            onPress={() =>
              this.props.navigation.navigate('SingleFood', singleFood)
            }
            bottomDivider
          />)
        })}
      </View>
    ) : (
      <View />
    )
  }
}

FoodScreen.navigationOptions = {
  title: 'My Food'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => ({
  allFoods: state.food
})

const mapDispatchToProps = dispatch => ({
  getInventory: () => dispatch(getAllInventory())
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen)
