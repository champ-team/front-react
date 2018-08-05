import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function FormErrorMessages({ errorMessages }) {
  const errors = errorMessages;

  if (!errors) {
    return <div />;
  }
  let key = 0;
  return (
    <div>
      {Object.keys(errors).map(objectKey => {
        const field = errors[objectKey];
        return Object.keys(field).map(fieldErrorKey => {
          // const errorText = field[fieldErrorKey];
          key += 1;
          return (
            <div className="alert alert-danger" key={key}>
              <FormattedMessage {...messages[objectKey]} />:{' '}
              <FormattedMessage {...messages[fieldErrorKey]} />
            </div>
          );
        });
      })}
    </div>
  );
}

FormErrorMessages.propTypes = {
  errorMessages: PropTypes.object,
};

export default FormErrorMessages;
