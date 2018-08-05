import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectUser = state => state.get('user', initialState);

const makeSelectUser = () =>
  createSelector(selectUser, userState => userState.get('user'));

const makeSelectUserToken = () =>
  createSelector(selectUser, userState => userState.getIn(['user', 'token']));

const makeSelectIsAuthorized = () =>
  createSelector(selectUser, userState => userState.get('isAuthorized'));

const makeSelectInProgress = () =>
  createSelector(selectUser, userState => userState.get('inProgress'));

const makeSelectAuthError = () =>
  createSelector(selectUser, userState => userState.get('authFail'));

export {
  makeSelectUser,
  makeSelectUserToken,
  makeSelectIsAuthorized,
  makeSelectInProgress,
  makeSelectAuthError,
};
