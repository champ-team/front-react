import { fromJS } from 'immutable';
import {
  FIND,
  FIND_ERROR,
  FIND_SUCCESS,
  UPDATE_VALUE,
  UPDATE_ERROR,
  UPDATE,
} from './constants';

export const initialState = fromJS({
  inProgress: false,
  errors: false,
  item: {},
  createErrors: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VALUE:
      return state.setIn(['item'].concat(action.field), action.value);
    case UPDATE:
      return state.set('inProgress', true).set('createErrors', {});
    case UPDATE_ERROR:
      return state
        .set('inProgress', false)
        .set('createErrors', fromJS(action.message.data.message));
    case FIND:
      return state
        .set('inProgress', true)
        .set('errors', false)
        .set('createErrors', initialState.get('createErrors'));
    case FIND_SUCCESS: {
      const item = action.data;
      const textsObject = {};
      item.texts.forEach(text => {
        textsObject[text.language] = text;
      });

      item.texts = textsObject;

      return state
        .set('inProgress', false)
        .set('errors', false)
        .set('item', fromJS(item));
    }
    case FIND_ERROR:
      return state.set('inProgress', false).set('errors', true);
    default:
      return state;
  }
}

export default reducer;
