import { fromJS } from 'immutable';
import clientActivityReducer from '../reducer';

describe('clientActivityReducer', () => {
  it('returns the initial state', () => {
    expect(clientActivityReducer(undefined, {})).toEqual(fromJS({}));
  });
});
