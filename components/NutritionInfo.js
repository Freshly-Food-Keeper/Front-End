import React from 'react';
import { StyleSheet, View } from 'react-native';
import axios from "axios"
import { SPOONACULAR_APIKEY, NUTRITIONX_APPKEY, NUTRITIONX_APPID } from '../config/secrets'
import { BarChart, Grid } from 'react-native-svg-charts'


class NutritionInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nutritionInfo: []
    }
  }
  async componentDidMount() {
    const foodName = this.props.name
    const data = await axios.get(`https://api.nutritionix.com/v1_1/search/${foodName}?results=0:20&fields=brand_name,item_name,brand_id,item_id,upc,item_description,nf_ingredient_statement,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_servings_per_container,nf_serving_size_unit,nf_serving_weight_grams,images_front_full_url&appId=${NUTRITIONX_APPID}&appKey=${NUTRITIONX_APPKEY}`)
    this.setState({nutritionInfo: data[0]})
  }
  render() {
    const fill = 'rgb(134, 65, 244)'
    const data = [...this.state.nutritionInfo]
    return (
      <BarChart
        style={{ height: 200 }}
        data={data}
        svg={{ fill }}
        contentInset={{ top: 30, bottom: 30 }}
      >
        <Grid />
      </BarChart>
    )
  }
}

export default NutritionInfo