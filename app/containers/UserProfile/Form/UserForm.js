import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextInputGroup from 'components/TextInputGroup';
import messages from '../messages';
import RowJustify from '../../../components/bootstrap/RowJustify';

const UserForm = ({ state, handleInputChange, submitForm, errors }) => (
  <form onSubmit={submitForm}>
    <RowJustify size={6}>
      <TextInputGroup
        name="name"
        type="text"
        handleInputChange={handleInputChange}
        state={state.name}
        error={errors}
      />
      <TextInputGroup
        name="email"
        type="email"
        handleInputChange={handleInputChange}
        state={state.email}
        error={errors}
      />
      <TextInputGroup
        name="firstName"
        handleInputChange={handleInputChange}
        state={state.firstName}
        error={errors}
      />
      <TextInputGroup
        name="lastName"
        handleInputChange={handleInputChange}
        state={state.lastName}
        error={errors}
      />
      <TextInputGroup
        name="password"
        type="password"
        handleInputChange={handleInputChange}
        state={state.password}
        error={errors}
      />
    </RowJustify>
    <RowJustify size={6}>
      <button type="submit" className="btn btn-primary btn-block">
        <FormattedMessage {...messages.save} />
      </button>
    </RowJustify>
  </form>
);

UserForm.propTypes = {
  state: PropTypes.object,
  timezones: PropTypes.object,
  updateDisabled: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleUpdateDisabledChange: PropTypes.func,
  submitForm: PropTypes.func,
  errors: PropTypes.object,
};

export default UserForm;
