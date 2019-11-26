import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { getWastedPercentage } from '../store/reducers/dataVisuals'
import { connect } from 'react-redux'

class DataVisuals extends React.PureComponent {
  componentDidMount() {
    this.props.getWastedPercentage()
  }
  render() {
    const userData = this.props.percentages
    const wastedFood = {
      value: userData.wasted,
      svg: {
        fill: '#99ada8'
      },
      key: 'wasted'
    }
    const eatenFood = {
      value: userData.consumed,
      svg: {
        fill: '#1a473b'
      },
      key: 'eaten'
    }
    return (
      <View style={styles.container}>
        <PieChart style={{ height: 200 }} data={[wastedFood, eatenFood]} />
        <Text style={styles.consumedText}>{userData.consumed}% Consumed</Text>
      </View>
    )
  }
}

DataVisuals.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  consumedText: {
    padding: 0,
    margin: 0,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 15
  }
})

const mapStateToProps = state => ({
  percentages: state.data.percents
})

const mapDispatchToProps = dispatch => ({
  getWastedPercentage: () => dispatch(getWastedPercentage())
})

export default connect(mapStateToProps, mapDispatchToProps)(DataVisuals)
