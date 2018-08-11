import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserTeamDomain = state => state.get('clientActivity', initialState);

const makeSelectUserTeam = () =>
  createSelector(selectUserTeamDomain, substate => substate.get('item'));

const makeSelectUserTeamIsUpdate = () =>
  createSelector(
    selectUserTeamDomain,
    substate => substate.getIn(['item', 'id']) !== '',
  );

const makeSelectUserTeamProgress = () =>
  createSelector(selectUserTeamDomain, substate => substate.get('inProgress'));

const makeSelectUserTeamErrors = () =>
  createSelector(selectUserTeamDomain, substate => substate.get('errors'));
const makeSelectUserTeamCreateErrors = () =>
  createSelector(selectUserTeamDomain, substate =>
    substate.get('createErrors'),
  );

export {
  makeSelectUserTeam,
  makeSelectUserTeamIsUpdate,
  makeSelectUserTeamProgress,
  makeSelectUserTeamErrors,
  makeSelectUserTeamCreateErrors,
};
