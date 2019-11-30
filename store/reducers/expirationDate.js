import axios from 'axios';
import { BACK_END_SERVER } from '../../config/secrets.js';

const expirationDate = '';

const GOT_EXPIRATION_DATE = 'GOT_EXPIRATION_DATE';

const gotExpirationDate = life => ({
  type: GOT_EXPIRATION_DATE,
  life,
});

export const getExpirationDate = foodName => {
  console.log('in expiration date thunk');
  console.log(foodName);
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `${BACK_END_SERVER}/api/expiration/${foodName}`
      );
      // console.log('data', data)
      dispatch(gotExpirationDate(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = expirationDate, action) {
  switch (action.type) {
    case GOT_EXPIRATION_DATE:
      return action.life;
    default:
      return state;
  }
}
