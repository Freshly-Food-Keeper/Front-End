import axios from 'axios'

const foods = []

const GOT_ALL_INVENTORY = 'GOT_ALL_INVENTORY'

const gotAllInventory = allFoods => ({
  type: GOT_ALL_INVENTORY,
  allFoods
})

export const getAllInventory = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://freshly-back-end.herokuapp.com/api/${userId}/foods`
      )
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
