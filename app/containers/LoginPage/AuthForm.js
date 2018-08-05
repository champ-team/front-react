import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const AuthForm = ({ emailKeyup, passwordKeyup, submitForm, authError }) => (
  <form onSubmit={submitForm}>
    <div className="form-group">
      <label htmlFor="Email">
        <FormattedMessage {...messages.email} />
      </label>
      <FormattedMessage {...messages.emailPlaceholder}>
        {placeholder => (
          <input
            type="text"
            className={`form-control${authError ? ' is-invalid' : ''}`}
            id="Email"
            aria-describedby="emailHelp"
            placeholder={placeholder}
            onChange={emailKeyup}
          />
        )}
      </FormattedMessage>
      <div className="invalid-feedback">
        <FormattedMessage {...messages.invalidCredentials} />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="Password">
        <FormattedMessage {...messages.password} />
      </label>
      <FormattedMessage {...messages.passwordPlaceholder}>
        {placeholder => (
          <input
            type="password"
            className="form-control"
            id="Password"
            placeholder={placeholder}
            onChange={passwordKeyup}
          />
        )}
      </FormattedMessage>
      <div className="invalid-feedback">Please enter password</div>
    </div>
    <div className="row justify-content-center">
      <div className="col-6">
        <button type="submit" className="btn btn-primary btn-block">
          <FormattedMessage {...messages.loginButton} />
        </button>
      </div>
    </div>
  </form>
);

AuthForm.propTypes = {
  emailKeyup: PropTypes.func,
  passwordKeyup: PropTypes.func,
  submitForm: PropTypes.func,
  authError: PropTypes.bool,
};

export default AuthForm;
