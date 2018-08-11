import {
  ROUTE_USER_DASHBOARD,
  ROUTE_USER_PROFILE,
  ROUTE_USER_TEAM,
  ROUTE_USER_TOURNAMENT,
} from './route-names';
import UserDashboard from '../UserDashboard/Loadable';
import UserProfileForm from '../UserProfile/Form/Loadable';
import UserTeamForm from '../UserTeam/Form/Loadable';
import UserTournament from '../Tournaments/Loadable';

const Routes = [
  {
    exact: true,
    path: ROUTE_USER_DASHBOARD,
    component: UserDashboard,
  },
  {
    exact: true,
    path: ROUTE_USER_PROFILE,
    component: UserProfileForm,
  },
  {
    exact: true,
    path: ROUTE_USER_TEAM,
    component: UserTeamForm,
  },
  {
    exact: true,
    path: ROUTE_USER_TOURNAMENT,
    component: UserTournament,
  },
];

export default Routes;
