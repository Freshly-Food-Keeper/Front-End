import axios from 'axios'

const dataVisuals = {
  percents: {}
}

const GOT_WASTED_PERCENTAGE = 'GOT_WASTED_PERCENTAGE'

const gotWastedPrecentage = percents => ({
  type: GOT_WASTED_PERCENTAGE,
  percents
})

export const getWastedPercentage = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://freshly-back-end.herokuapp.com/api/data/${userId}`
      )
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
