/**
 *
 * Asynchronously loads the component for ClientActivity
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
