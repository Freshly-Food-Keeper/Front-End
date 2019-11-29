import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BACK_END_SERVER } from '../../config/secrets';

/**
 * ACTION TYPES
 */
const GOT_USER = 'GOT_USER';
const REMOVED_USER = 'REMOVED_USER';
const UPDATED_USER = 'UPDATED_USER';
const REMOVED_ERROR = 'REMOVED_ERROR';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const gotUser = user => ({ type: GOT_USER, user });
const removedUser = () => ({ type: REMOVED_USER });
const updatedUser = user => ({ type: UPDATED_USER, user });
const removedError = () => ({ type: REMOVED_ERROR });

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(gotUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.clear();
    dispatch(removedUser());
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = user => async dispatch => {
  try {
    await axios.patch(`/api/users/${user.id}`, user);
    dispatch(updatedUser(user));
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = user => async dispatch => {
  let res;
  try {
    res = await axios.post(`${BACK_END_SERVER}/auth/login`, user);
  } catch (authError) {
    return dispatch(gotUser({ loginError: authError }));
  }

  try {
    await AsyncStorage.setItem('userId', `${res.data.id}`);
    dispatch(gotUser(res.data));
  } catch (dispatchError) {
    console.error(dispatchError);
  }
};

export const createUser = user => async dispatch => {
  let res;
  try {
    res = await axios.post(`${BACK_END_SERVER}/auth/signup`, user);
  } catch (authError) {
    return dispatch(gotUser({ signUpError: authError }));
  }

  try {
    await AsyncStorage.setItem('userId', `${res.data.id}`);
    dispatch(gotUser(res.data));
  } catch (dispatchError) {
    console.error(dispatchError);
  }
};

export const removeError = () => async dispatch => {
  dispatch(removedError())
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    case REMOVED_USER:
      return defaultUser;
    case UPDATED_USER:
      return { ...state, ...action.user };
    case REMOVED_ERROR:
      return defaultUser;
    default:
      return state;
  }
}
