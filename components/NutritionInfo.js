import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getNutrition } from '../store/reducers/nutrition';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingScreen from '../screens/LoadingScreen';

class NutritionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }
  componentDidMount() {
    const food = this.props.food;
    this.props.getNutrition(food.name);
  }

  renderRow(item, id) {
    return (
      <View key={id}>
        <View style={styles.row}>
          <View>
            <Text>
              {!item.header ? '\t' : ''}
              {item.label}
            </Text>
          </View>
          <View>
            <Text>{item.value}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
        />
      </View>
    );
  }

  render() {
    const nutrition = this.props.nutrition;
    return nutrition ? (
      <ScrollView style={styles.container}>
        {nutrition.map((item, index) => {
          item.value = Math.floor(item.value)
          return this.renderRow(item, index);
        })}
      </ScrollView>
    ) : (
      <LoadingScreen />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});

const mapStateToProps = state => ({
  nutrition: state.nutrition,
});

const mapDispatchToProps = dispatch => ({
  getNutrition: foodName => dispatch(getNutrition(foodName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NutritionInfo);
