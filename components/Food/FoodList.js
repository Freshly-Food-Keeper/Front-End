import React from 'react';
import { ScrollView } from 'react-native';
import { titleCase } from '../../utils';
import { styles } from '../../styles';
import SingleFood from './SingleFood';

const FoodList = props => {
  const { foods, visible, navigation, onLongPress } = props;

  return (
    <ScrollView style={styles.flex}>
      {props.renderStatusDialog()}
      {foods.map((food, index) => {
        // Creating a new object here so that the calculations we do can also easily be sent to the Single Food View
        const singleFood = {
          id: food.id,
          name: titleCase(food.name),
          expiresIn: food.expiresIn,
          imageUrl: food.imageUrl,
        };
        console.log(food.expiresIn)
        return (
          <SingleFood
            key={index}
            singleFood={singleFood}
            visible={visible}
            navigation={navigation}
            onLongPress={onLongPress}
          />
        )
      })}
    </ScrollView>
  );
};
export default FoodList;
