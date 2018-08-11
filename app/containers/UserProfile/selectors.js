import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserProfileDomain = state =>
  state.get('clientProfile', initialState);

const makeSelectUserProfile = () =>
  createSelector(selectUserProfileDomain, substate => substate.get('item'));

const makeSelectUserProfileProgress = () =>
  createSelector(selectUserProfileDomain, substate =>
    substate.get('inProgress'),
  );

const makeSelectUserProfileErrors = () =>
  createSelector(selectUserProfileDomain, substate => substate.get('errors'));

const makeSelectUserProfileCreateErrors = () =>
  createSelector(selectUserProfileDomain, substate =>
    substate.get('createErrors'),
  );

export {
  makeSelectUserProfile,
  makeSelectUserProfileProgress,
  makeSelectUserProfileErrors,
  makeSelectUserProfileCreateErrors,
};
