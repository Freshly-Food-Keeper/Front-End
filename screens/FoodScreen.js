import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native'
import { ListItem, Badge, withBadge, Avatar } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale' // https://github.com/kohver/react-native-touchable-scale
import { connect } from 'react-redux'
import { getAllInventory } from '../store/reducers/food'
import user from '../store/reducers/user'

const foods = [
  {
    id: 2,
    name: 'apple',
    expiresIn: 14,
    imageUrl: 'https://spoonacular.com/cdn/ingredients_250x250/apple.jpg'
  },
  {
    id: 3,
    name: 'orange',
    expiresIn: 7,
    imageUrl: 'https://spoonacular.com/cdn/ingredients_250x250/orange.jpg'
  },
  {
    id: 5,
    name: 'blueberries',
    expiresIn: 2,
    imageUrl: 'https://spoonacular.com/cdn/ingredients_250x250/blueberries.jpg'
  }
]

const titleCase = title => {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

const dayCalculator = days => {
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
        source={{
          uri: food.imageUrl
        }}
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
    console.log('PROPS', this.props)
    return (
      <View style={styles.container}>
        {foods.map(food => (
          <ListItem
            key={food.id}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            leftAvatar={
              <AvatarComponent food={food} showBadge={food.expiresIn < 7} />
            }
            title={titleCase(food.name)}
            titleStyle={{ color: '#262626', fontWeight: 'bold' }}
            subtitle={dayCalculator(food.expiresIn)}
            subtitleStyle={{ color: '#262626' }}
            chevron={{ color: '#262626' }}
            bottomDivider
          />
        ))}
      </View>
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
  getInventory: userId => dispatch(getAllInventory(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen)
