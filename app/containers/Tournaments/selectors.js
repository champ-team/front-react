import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserTournamentDomain = state =>
  state.get('userTournament', initialState);

const makeSelectUserTournaments = () =>
  createSelector(selectUserTournamentDomain, substate => substate.get('items'));

const makeSelectUserTournament = () =>
  createSelector(selectUserTournamentDomain, substate => substate.get('item'));

const makeSelectUserTournamentProgress = () =>
  createSelector(selectUserTournamentDomain, substate =>
    substate.get('inProgress'),
  );

const makeSelectUserTournamentErrors = () =>
  createSelector(selectUserTournamentDomain, substate =>
    substate.get('errors'),
  );

export {
  makeSelectUserTournament,
  makeSelectUserTournaments,
  makeSelectUserTournamentProgress,
  makeSelectUserTournamentErrors,
};
