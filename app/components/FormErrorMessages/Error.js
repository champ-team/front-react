import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Error({ errorMessages }) {
  const errors = errorMessages;

  if (!errors) {
    return <div />;
  }
  let key = 0;
  return (
    <div className="invalid-feedback" style={{ display: 'block' }}>
      {Object.keys(errorMessages).map(fieldErrorKey => {
        // const errorText = field[fieldErrorKey];
        key += 1;
        return (
          <div key={key}>
            <FormattedMessage {...messages[fieldErrorKey]} />
          </div>
        );
      })}
    </div>
  );
}

Error.propTypes = {
  errorMessages: PropTypes.object,
};

export default Error;
