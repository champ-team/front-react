import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ServerError() {
  return <FormattedMessage {...messages.header} />;
}

ServerError.propTypes = {};

export default ServerError;
