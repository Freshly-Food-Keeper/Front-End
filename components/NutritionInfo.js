import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from "axios"
import { SPOONACULAR_APIKEY, NUTRITIONX_APPKEY, NUTRITIONX_APPID } from '../config/secrets'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'


class NutritionInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nutritionInfo: {}
    }
  }
  async componentDidMount() {
    const foodName = this.props.food
    const res = await axios.get(`https://api.nutritionix.com/v1_1/search/${foodName}?results=0:20&fields=brand_name,item_name,brand_id,item_id,upc,item_description,nf_ingredient_statement,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_servings_per_container,nf_serving_size_unit,nf_serving_weight_grams,images_front_full_url&appId=${NUTRITIONX_APPID}&appKey=${NUTRITIONX_APPKEY}`)
    console.log(data)
    this.setState({nutritionInfo: res.data})
    console.log('state', this.state)
  }
  render() {
    const fill = 'rgb(134, 65, 244)'
    const nutrition = this.state.nutritionInfo
    const data = [
      {
        value: nutrition.nf_calories,
        label: 'Calories',
      },
      {
        value: nutrition.nf_total_fat,
        label: 'Total Fat (g)',
      },
      {
        value: nutrition.nf_saturated_fat,
        label: 'Saturated Fat (g)',
      },
      {
        value: nutrition.nf_cholesterol,
        label: 'Cholesterol',
      },
      {
        value: nutrition.nf_sodium,
        label: 'Sodium',
      },
      {
        value: nutrition.nf_total_carbohydrate,
        label: 'Carbohydrates',
      },
      {
        value: nutrition.nf_dietary_fiber,
        label: 'Fiber',
      },
      {
        value: nutrition.nf_sugars,
        label: 'Sugars',
      },
      {
        value: nutrition.nf_protein,
        label: 'Protien',
      },
      {
        value: nutrition.nf_vitamin_a_dv,
        label: 'Vitamin a',
      },
      {
        value: nutrition.nf_vitamin_c_dv,
        label: 'Vitamin c',
      },
      {
        value: nutrition.nf_iron_dv,
        label: 'Iron',
      },
      {
        value: nutrition.nf_potassium,
        label: 'Potassium',
      },
    ]
    return (
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        <YAxis
          data={data}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          formatLabel={(_, index) => data[index].label}
        />
        <BarChart
          style={{ flex: 1, marginLeft: 8 }}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.value}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.VERTICAL} />
        </BarChart>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    height: 200, 
    paddingVertical: 16 
  }
})

export default NutritionInfo