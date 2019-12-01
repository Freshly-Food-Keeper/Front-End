import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BACK_END_SERVER, SPOONACULAR_API_KEY } from '../../config/secrets.js';

const initialState = {
  recipes: [],
  favoriteRecipes: [],
};

const GOT_RECIPES_WITH_INGREDIENT = 'GOT_RECIPES_WITH_INGREDIENT';
const GOT_FAVORITE_RECIPES = 'GOT_FAVORITE_RECIPES';

const gotRecipesWithIngredient = allRecipes => ({
  type: GOT_RECIPES_WITH_INGREDIENT,
  allRecipes,
});

const gotFavoriteRecipes = favoriteRecipes => ({
  type: GOT_FAVORITE_RECIPES,
  favoriteRecipes,
});

export const getRecipesWithIngredient = ingredient => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&includeIngredients=${ingredient}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&limitLicense=true&number=5&apiKey=${SPOONACULAR_API_KEY}`
      );

      dispatch(gotRecipesWithIngredient(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getFavoriteRecipes = () => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const { data } = await axios.get(`${BACK_END_SERVER}/api/recipe`, {
        params: {
          userId,
        },
      });
      dispatch(gotFavoriteRecipes(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RECIPES_WITH_INGREDIENT:
      return { ...state, recipes: action.allRecipes };
    case GOT_FAVORITE_RECIPES:
      return { ...state, favoriteRecipes: action.favoriteRecipes };
    default:
      return state;
  }
}
