import { fromJS } from 'immutable';
import {
  FETCH,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FIND,
  FIND_ERROR,
  FIND_SUCCESS,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_ERROR,
  SUBSCRIBE,
} from './constants';

export const initialState = fromJS({
  inProgress: false,
  items: {
    total: 0,
    page: 0,
    count: 0,
    data: [],
  },
  errors: false,
  item: {
    id: '',
  },
  createErrors: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return state.set('inProgress', true).set('errors', false);
    case FETCH_SUCCESS:
      return state
        .set('inProgress', false)
        .set('items', fromJS(action.data))
        .set('errors', false);
    case FETCH_ERROR:
      return state.set('inProgress', false).set('errors', true);
    case SUBSCRIBE:
      return state.set('inProgress', true).set('createErrors', {});
    case SUBSCRIBE_ERROR:
      return state
        .set('inProgress', false)
        .set('createErrors', action.message.data.message);
    case SUBSCRIBE_SUCCESS:
      return state.set('inProgress', false).set('createErrors', {});
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
