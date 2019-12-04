import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BACK_END_SERVER, SPOONACULAR_API_KEY } from '../../config/secrets.js'

const foods = [];

// ACTION TYPES
const GOT_ALL_INVENTORY = 'GOT_ALL_INVENTORY';
const ADDED_FOOD = 'ADDED_FOOD';
const DELETE_FOOD = 'DELETE_FOOD';
const UPDATE_FOOD = 'UPDATE_FOOD';

// ACTION CREATORS
const gotAllInventory = allFoods => ({
  type: GOT_ALL_INVENTORY,
  allFoods,
});

const addedFood = food => ({
  type: ADDED_FOOD,
  food,
});

const deletedFood = id => ({
  type: DELETE_FOOD,
  id,
});

// THUNKS
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
      const imageUrl = await getImage(food)
      const userId = await AsyncStorage.getItem('userId');
      const foodObj = {
        userId,
        food,
        shelfLife,
        imageUrl
      }
      const { data } = await axios.post(`${BACK_END_SERVER}/api/food`, foodObj);

      const newFood = {
        expiresIn: shelfLife,
        id: data.foodId,
        imageUrl: imageUrl,
        name: food,
      };

      dispatch(addedFood(newFood));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFood = foodId => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await axios.delete(`${BACK_END_SERVER}/api/food/`, {
        params: {
          userId,
          foodId,
        },
      });
      dispatch(deletedFood(foodId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateFood = (foodId, status) => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await axios.put(`${BACK_END_SERVER}/api/food/`, {
        userId,
        foodId,
        status,
      });
      dispatch(getAllInventory());
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
    case DELETE_FOOD:
      //we have an ID of the deleted item, and we need to update the state to remove that item
      return state.filter(function(food) {
        if (action.id !== food.id) {
          return food;
        }
      });
    case UPDATE_FOOD:
      return state;
    default:
      return state;
  }
}

async function getImage(name) {
  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/food/ingredients/autocomplete?query=${name}&number=1&apiKey=${SPOONACULAR_API_KEY}`
    )
    return data.length
      ? `https://spoonacular.com/cdn/ingredients_250x250/${data[0].image}`
      : null
  } catch (error) {
    console.error(error)
  }
}
