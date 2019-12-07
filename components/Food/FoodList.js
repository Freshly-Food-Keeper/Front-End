import React from 'react';
import { ScrollView } from 'react-native';
import { titleCase } from '../../utils';
import { styles } from '../../styles';
import SingleFood from './SingleFood';
import LoadingScreen from '../../screens/LoadingScreen';

const FoodList = props => {
  const { foods, visible, navigation, onLongPress } = props;

  return foods ? (
    <ScrollView style={styles.flex}>
      {props.renderStatusDialog()}
      {foods.map((food, i) => {
        // Creating a new object here so that the calculations we do can also easily be sent to the Single Food View
        const singleFood = {
          id: food.id,
          name: titleCase(food.name),
          expiresIn: food.expiresIn,
          imageUrl: food.imageUrl,
        };
        return (
          <SingleFood
            key={i}
            singleFood={singleFood}
            visible={visible}
            navigation={navigation}
            onLongPress={onLongPress}
          />
        );
      })}
    </ScrollView>
  ) : (
    <LoadingScreen />
  );
};
export default FoodList;
