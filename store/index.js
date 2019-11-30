import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from './reducers/user';
import food from './reducers/food';
import recipe from './reducers/recipe';
import data from './reducers/dataVisuals';
import googleVision from './reducers/googleVision';
import expirationDate from './reducers/expirationDate';

const reducer = combineReducers({
  user,
  food,
  recipe,
  data,
  googleVision,
  expirationDate,
});
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from './reducers/user';
export * from './reducers/food';
export * from './reducers/recipe';
export * from './reducers/dataVisuals';
export * from './reducers/googleVision';
export * from './reducers/expirationDate';
