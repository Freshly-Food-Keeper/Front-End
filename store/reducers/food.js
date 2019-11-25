
import axios from 'axios'

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

const GOT_ALL_INVENTORY = 'GOT_ALL_INVENTORY'

const gotAllInventory = allFoods => ({
  type: GOT_ALL_INVENTORY,
  allFoods
})

export const getAllInventory = userId => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/2/foods')
      dispatch(gotAllInventory(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = foods, action) {
  switch (action.type) {
    case GOT_ALL_INVENTORY:
      return action.allFoods
    default:
      return state
  }
}
