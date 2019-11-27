import axios from 'axios';
import { AsyncStorage } from 'react-native';
// import history from '../history'

/**
 * ACTION TYPES
 */
const CREATED_USER = 'CREATED_USER';
const GOT_USER = 'GOT_USER';
const REMOVED_USER = 'REMOVED_USER';
const UPDATED_USER = 'UPDATED_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const createdUser = user => ({ type: CREATED_USER, user });
const gotUser = user => ({ type: GOT_USER, user });
const removedUser = () => ({ type: REMOVED_USER });
const updatedUser = user => ({ type: UPDATED_USER, user });

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

// export const auth = (
//   firstName,
//   lastName,
//   email,
//   password,
//   method
// ) => async dispatch => {
//   let res;
//   try {
//     console.log('yoyo');
//     res = await axios.post(
//       `http:/172.16.26.110:8080/auth/login`,
//       // `https://freshly-back-end.herokuapp.com/auth/${method}`,
//       {
//         firstName,
//         lastName,
//         email,
//         password,
//       }
//     );
//   } catch (authError) {
//     return dispatch(getUser({ error: authError }));
//   }

//   try {
//     dispatch(getUser({ ...res.data, isLoggedIn: true }));
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr);
//   }
// };

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
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
  let res
  try {
    res = await axios.post(`https://freshly-back-end.herokuapp.com/auth/login`, user);
    // dispatch(gotUser(user));
    console.log('user logged in:', user);
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }

  try {
<<<<<<< HEAD
    await AsyncStorage.setItem('userId', `${res.data.id}`);
=======
<<<<<<< HEAD
    await AsyncStorage.setItem('userId', `${user.id}`);
=======
    await AsyncStorage.setItem('userId', `${res.data.id}`);
>>>>>>> 6b78cace5d99a603639fe451d705fe1fbe77b74b
>>>>>>> bf033cda3d1823ec1f625345741d6e60d3c30566
    dispatch(gotUser(res.data))
  } catch (dispatchError) {
    console.error(dispatchError)
  }
};

export const createUser = user => async dispatch => {
  let res
  try {
    res = await axios.post(`https://freshly-back-end.herokuapp.com/auth/signup`, user);
    // dispatch(gotUser(user));
    console.log('user signed in:', user);
  } catch (authError) {
    return dispatch(gotUser({ error: authError }))
  }

  try {
    await AsyncStorage.setItem('userId', `${res.data.id}`);
    dispatch(gotUser(res.data))
  } catch (dispatchError) {
    console.error(dispatchError)
  }
};
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case CREATED_USER:
      return action.user;
    case GOT_USER:
      return action.user;
    case REMOVED_USER:
      return defaultUser;
    case UPDATED_USER:
      return { ...state, ...action.user };
    default:
      return state;
  }
}
