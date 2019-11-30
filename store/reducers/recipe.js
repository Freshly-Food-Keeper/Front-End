import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BACK_END_SERVER, SPOONACULAR_API_KEY } from '../../config/secrets.js';

const initialState = {
  recipes: [],
  favoriteRecipes: [],
  instructions: [],
};

const GOT_RECIPES_WITH_INGREDIENT = 'GOT_RECIPES_WITH_INGREDIENT';
const GOT_FAVORITE_RECIPES = 'GOT_FAVORITE_RECIPES';
const GOT_RECIPE_INSTRUCTIONS = 'GOT_FAVORITE_RECIPES';

const gotRecipesWithIngredient = allRecipes => ({
  type: GOT_RECIPES_WITH_INGREDIENT,
  allRecipes,
});

const gotFavoriteRecipes = favoriteRecipes => ({
  type: GOT_FAVORITE_RECIPES,
  favoriteRecipes,
});

const gotRecipeInstructions = instructions => ({
  type: GOT_RECIPE_INSTRUCTIONS,
  instructions,
});

export const getRecipesWithIngredient = ingredient => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&apiKey=${SPOONACULAR_API_KEY}`
      );

      dispatch(gotRecipesWithIngredient(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getRecipeInstructions = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?stepBreakdown=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      dispatch(gotRecipeInstructions(data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getFavoriteRecipes = () => {
  console.log('bye');
  console.log('userId', AsyncStorage.getItem('userId'));
  return async dispatch => {
    try {
      console.log('hi');
      // const userId = await AsyncStorage.getItem('userId');
      const { data } = await axios.get(
        `https://freshly-back-end.herokuapp.com/api/recipe?userId=1`
      );
      // const { data } = await axios.get(`${BACK_END_SERVER}/api/recipe`, {
      //   params: {
      //     userId: 2,
      //   },
      // });

      console.log('my recipes', data);

      dispatch(gotFavoriteRecipes(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RECIPE_INSTRUCTIONS:
      return { ...state, instructions: action.instructions };
    case GOT_RECIPES_WITH_INGREDIENT:
      return { ...state, recipes: action.allRecipes };
    case GOT_FAVORITE_RECIPES:
      return { ...state, favoriteRecipes: action.favoriteRecipes };
    default:
      return state;
  }
}
