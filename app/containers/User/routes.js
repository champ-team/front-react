import { ROUTE_USER_DASHBOARD, ROUTE_USER_PROFILE } from './route-names';
import UserDashboard from '../UserDashboard/Loadable';
import UserProfileForm from '../UserProfile/Form/Loadable';

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
];

export default Routes;
