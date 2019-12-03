import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { getWastedPercentage } from '../store/reducers/dataVisuals'
import { connect } from 'react-redux'

class DataVisuals extends React.PureComponent {
  componentDidMount() {
    this.props.getWastedPercentage()
  }
  render() {
    const userData = this.props.percentages
    let text = `${userData.consumed}% Consumed`
    let wastedFood = {
      value: userData.wasted,
      svg: {
        fill: '#99ada8'
      },
      key: 'wasted'
    }
    let eatenFood = {
      value: userData.consumed,
      svg: {
        fill: '#1a473b'
      },
      key: 'eaten'
    }

    // If there's no food, force the values so we can still get a pie chart place holder
    if (userData.consumed === 0 && userData.wasted === 0) {
      eatenFood.value = 0
      wastedFood.value = 100
      text = 'Get Started!'
    }

    return (
      <View style={styles.container}>
        <PieChart style={{ height: 200 }} data={[wastedFood, eatenFood]} />
        <Text style={styles.consumedText}>{text}</Text>
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
