import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

const linedata = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      data: [50, 49, 45, 30, 25, 15],
      strokeWidth: 3 // optional
    }
  ]
}

export default class DataVisualization extends React.Component {
  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30 }}>
          Test Line Chart
        </Text>
        <LineChart
          data={linedata}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'% '}
          chartConfig={{
            backgroundColor: '#357766',
            backgroundGradientFrom: '#035640',
            backgroundGradientTo: '#013326',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2'
            }
          }}
        />
      </View>
    )
  }
}


DataVisualization.navigationOptions = {
  header: null
}
