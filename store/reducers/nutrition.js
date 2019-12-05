import axios from 'axios'
import {
  NUTRITIONX_APPKEY,
  NUTRITIONX_APPID
} from '../../config/secrets.js'

const nutrition = []

const GOT_NUTRITION = 'GOT_NUTRITION'

const gotNutrition = info => ({
  type: GOT_NUTRITION,
  info
})

const createNutritionArray = info => [
  {
    value: info.nf_calories || 0,
    label: 'Calories',
    header: true
  },
  {
    value: info.nf_total_fat || 0,
    label: 'Total Fat (g)',
    header: true
  },
  {
    value: info.nf_saturated_fat || 0,
    label: 'Saturated Fat (g)',
    header: false
  },
  {
    value: info.nf_cholesterol || 0,
    label: 'Cholesterol',
    header: true
  },
  {
    value: info.nf_sodium || 0,
    label: 'Sodium',
    header: true
  },
  {
    value: info.nf_total_carbohydrate || 0,
    label: 'Carbohydrates',
    header: true
  },
  {
    value: info.nf_dietary_fiber || 0,
    label: 'Fiber',
    header: false
  },
  {
    value: info.nf_sugars || 0,
    label: 'Sugars',
    header: false
  },
  {
    value: info.nf_protein || 0,
    label: 'Protein',
    header: true
  },
  {
    value: info.nf_vitamin_a_dv || 0,
    label: 'Vitamin A',
    header: true
  },
  {
    value: info.nf_vitamin_c_dv || 0,
    label: 'Vitamin C',
    header: true
  },
  {
    value: info.nf_iron_dv || 0,
    label: 'Iron',
    header: true
  },
  {
    value: info.nf_potassium || 0,
    label: 'Potassium',
    header: true
  }
]

export const getNutrition = food => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
      `https://api.nutritionix.com/v1_1/search/${food}?results=0:20&fields=brand_name,item_name,brand_id,item_id,upc,item_description,nf_ingredient_statement,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_servings_per_container,nf_serving_size_unit,nf_serving_weight_grams,images_front_full_url&appId=${NUTRITIONX_APPID}&appKey=${NUTRITIONX_APPKEY}`
    )
      dispatch(gotNutrition(createNutritionArray(data.hits[0].fields)))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = nutrition, action) {
  switch (action.type) {
    case GOT_NUTRITION:
      return action.info
    default:
      return state
  }
}
