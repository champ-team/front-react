import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Card from 'components/bootstrap/Card';
import Loading from 'components/Loading';
import ServerError from 'components/ServerError';

import saga from '../saga';
import messages from '../messages';
import { ROUTE_USER_DASHBOARD } from '../../User/route-names';
import { makeSelectUser } from '../../UserProvider/selectors';
import {
  makeSelectUserProfile,
  makeSelectUserProfileCreateErrors,
  makeSelectUserProfileErrors,
  makeSelectUserProfileProgress,
} from '../selectors';
import { get, update, updateValue } from '../actions';
import reducer from '../reducer';
import UserForm from './UserForm';

/* eslint-disable react/prefer-stateless-function */
export class UserProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(get(this.props.user.get('token')));
  }

  submitForm(e) {
    e.preventDefault();
    this.props.dispatch(
      update(this.props.user.get('token'), this.props.item.toJS()),
    );
  }

  handleInputChange(name, value) {
    this.props.dispatch(updateValue(name, value));
  }

  render() {
    if (this.props.inProgress) {
      return <Loading />;
    }

    if (this.props.serverError) {
      return <ServerError />;
    }

    return (
      <Card
        url={ROUTE_USER_DASHBOARD}
        title={<FormattedMessage {...messages.header} />}
      >
        <UserForm
          state={this.props.item.toJS()}
          handleInputChange={this.handleInputChange}
          submitForm={this.submitForm}
          errors={this.props.errors}
        />
      </Card>
    );
  }
}

UserProfileForm.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object,
  errors: PropTypes.object,
  serverError: PropTypes.bool,
  user: PropTypes.object,
  inProgress: PropTypes.bool,
  intl: intlShape.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  item: makeSelectUserProfile(),
  serverError: makeSelectUserProfileErrors(),
  errors: makeSelectUserProfileCreateErrors(),
  inProgress: makeSelectUserProfileProgress(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'userProfileForm', saga });
const withReducer = injectReducer({ key: 'userProfile', reducer });

export default injectIntl(
  compose(
    withSaga,
    withReducer,
    withConnect,
  )(UserProfileForm),
);
