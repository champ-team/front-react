/**
 *
 * Asynchronously loads the component for UserActivity
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
