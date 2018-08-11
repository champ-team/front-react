import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextInputGroup from 'components/TextInputGroup';
import TeamMemberInput from 'components/TeamMemberInput';
import messages from '../messages';
import RowJustify from '../../../components/bootstrap/RowJustify';

const TeamForm = ({
  state,
  isUpdate,
  handleInputChange,
  submitForm,
  errors,
}) => (
  <form onSubmit={submitForm}>
    <TextInputGroup
      name="name"
      type="text"
      handleInputChange={handleInputChange}
      state={state.name}
      error={errors}
    />
    <TeamMemberInput
      handleMemberChange={handleInputChange}
      state={state.member}
    />
    <hr />
    <RowJustify size={6}>
      <button type="submit" className="btn btn-primary btn-block">
        <FormattedMessage {...messages[isUpdate ? 'update' : 'create']} />
      </button>
    </RowJustify>
  </form>
);

TeamForm.propTypes = {
  state: PropTypes.object,
  handleInputChange: PropTypes.func,
  submitForm: PropTypes.func,
  errors: PropTypes.object,
  isUpdate: PropTypes.bool,
};

export default TeamForm;
