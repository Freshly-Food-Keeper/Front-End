import React from 'react';
import { View } from 'react-native';
import { titleCase, dayCalculator } from '../../utils';
import { styles } from '../../styles';
import SingleFood from './SingleFood';

const FoodList = props => {
  const { foods, visible, navigation, onLongPress } = props;

  return (
    <View style={styles.flex}>
      {props.renderStatusDialog()}
      {foods.map(food => {
        // Creating a new object here so that the calculations we do can also easily be sent to the Single Food View
        const singleFood = {
          id: food.id,
          name: titleCase(food.name),
          expiresIn: dayCalculator(food.expiresIn),
          imageUrl: food.imageUrl,
        };
        return (
          <SingleFood
            singleFood={singleFood}
            key={singleFood.id}
            visible={visible}
            navigation={navigation}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};
export default FoodList;
