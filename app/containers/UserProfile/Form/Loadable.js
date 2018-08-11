/**
 *
 * Asynchronously loads the component for UserActivityForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
