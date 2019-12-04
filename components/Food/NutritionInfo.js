import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getNutrition } from '../../store/reducers/nutrition';
import LoadingScreen from '../../screens/LoadingScreen';
import { styles } from '../../styles';

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
        <View style={styles.nutritionRow}>
          <View>
            <Text style={styles.nutr}>
              {!item.header ? '\t' : ''}
              {item.label}
            </Text>
          </View>
          <View>
            <Text style={styles.nutritionText}>{item.value}</Text>
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
      <ScrollView
        style={styles.nutritionContainer}
        contentInset={{ top: 0, left: 0, bottom: 35, right: 0 }}
      >
        {nutrition.map((item, index) => {
          item.value = Math.floor(item.value)
          return this.renderRow(item, index)
        })}
      </ScrollView>
    ) : (
      <LoadingScreen />
    )
  }
}

const mapStateToProps = state => ({
  nutrition: state.nutrition,
});

const mapDispatchToProps = dispatch => ({
  getNutrition: foodName => dispatch(getNutrition(foodName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NutritionInfo);
