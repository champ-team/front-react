import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import messages from './messages';
import AuthForm from './AuthForm';
import Card from '../../components/bootstrap/Card';
import Wrapper from './Wrapper';
import Loading from '../../components/Loading';
import { authorize, checkToken } from '../UserProvider/actions';
import saga from '../UserProvider/saga';
import {
  makeSelectAuthError,
  makeSelectInProgress,
  makeSelectIsAuthorized,
  makeSelectUser,
  makeSelectUserToken,
} from '../UserProvider/selectors';

/* eslint-disable react/prefer-stateless-function */
class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    this.props.authorize(this.state.email, this.state.password);
  }

  componentDidMount() {
    if (this.props.token !== '') {
      this.props.checkToken(this.props.token);
    }
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  updatePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  render() {
    if (this.props.isAuthorized) {
      switch (this.props.user.get('role')) {
        case 'Administrator':
          return <Redirect to="/admin" />;
        case 'Client':
          return <Redirect to="/user" />;
        default:
      }
    }
    if (this.props.inProgress) {
      return <Loading />;
    }

    return (
      <div className="row justify-content-md-center">
        <div className="col-lg-4">
          <Wrapper>
            <Card title={<FormattedMessage {...messages.login} />}>
              <AuthForm
                emailKeyup={this.updateEmail}
                passwordKeyup={this.updatePassword}
                submitForm={this.submitForm}
                authError={this.props.authError}
              />
            </Card>
          </Wrapper>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  authorize: PropTypes.func,
  checkToken: PropTypes.func,
  isAuthorized: PropTypes.bool,
  authError: PropTypes.bool,
  inProgress: PropTypes.bool,
  user: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectIsAuthorized(),
  user: makeSelectUser(),
  token: makeSelectUserToken(),
  authError: makeSelectAuthError(),
  inProgress: makeSelectInProgress(),
});

const mapDispatchToProps = dispatch => ({
  authorize: (email, password) => dispatch(authorize(email, password)),
  checkToken: token => dispatch(checkToken(token)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);
