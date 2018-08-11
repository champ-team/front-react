import { fromJS } from 'immutable';
import {
  RESET,
  CREATE,
  CREATE_ERROR,
  CREATE_SUCCESS,
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
  item: {
    id: '',
    name: '',
    member: [],
  },
  createErrors: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET: {
      return state
        .set('item', initialState.get('item'))
        .set('createErrors', initialState.get('createErrors'));
    }
    case UPDATE_VALUE:
      return state.setIn(['item'].concat(action.field), action.value);
    case CREATE:
      return state.set('inProgress', true).set('createErrors', {});
    case CREATE_SUCCESS:
      return state.set('inProgress', false).set('createErrors', {});
    case CREATE_ERROR:
      return state
        .set('inProgress', false)
        .set('createErrors', action.message.data.message);
    case UPDATE:
      return state.set('inProgress', true).set('createErrors', {});
    case UPDATE_ERROR:
      return state
        .set('inProgress', false)
        .set('createErrors', action.message.data.message);
    case FIND:
      return state
        .set('inProgress', true)
        .set('errors', false)
        .set('createErrors', initialState.get('createErrors'));
    case FIND_SUCCESS: {
      const item = action.data;
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
