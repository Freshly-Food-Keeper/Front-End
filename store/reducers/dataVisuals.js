import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { BACK_END_SERVER  } from  '../../config/secrets.js'

const dataVisuals = {
  percents: {}
}

const GOT_WASTED_PERCENTAGE = 'GOT_WASTED_PERCENTAGE'

const gotWastedPrecentage = percents => ({
  type: GOT_WASTED_PERCENTAGE,
  percents
})

export const getWastedPercentage = () => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      const { data } = await axios.get(`${BACK_END_SERVER}/api/data/`,
        {
          params: {
            userId
          }
        })
      dispatch(gotWastedPrecentage(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = dataVisuals, action) {
  switch (action.type) {
    case GOT_WASTED_PERCENTAGE:
      return { ...state, percents: action.percents }
    default:
      return state
  }
}
