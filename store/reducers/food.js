import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BACK_END_SERVER } from '../../config/secrets.js';

const foods = [];

const GOT_ALL_INVENTORY = 'GOT_ALL_INVENTORY';
const ADDED_FOOD = 'ADDED_FOOD';

const gotAllInventory = allFoods => ({
  type: GOT_ALL_INVENTORY,
  allFoods,
});
const addedFood = food => ({
  type: ADDED_FOOD,
  food,
});

export const getAllInventory = () => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const { data } = await axios.get(`${BACK_END_SERVER}/api/food/`, {
        params: {
          userId,
        },
      });
      dispatch(gotAllInventory(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addFood = (food, shelfLife) => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const foodObj = {
        userId,
        food,
        shelfLife,
      };
      const { data } = await axios.post(`${BACK_END_SERVER}/api/food`, foodObj);

      const newFood = {
        expiresIn: shelfLife,
        id: data.foodId,
        imageUrl: null,
        name: food,
      };

      dispatch(addedFood(newFood));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = foods, action) {
  switch (action.type) {
    case ADDED_FOOD:
      return [...state, action.food];
    case GOT_ALL_INVENTORY:
      return action.allFoods;
    default:
      return state;
  }
}
