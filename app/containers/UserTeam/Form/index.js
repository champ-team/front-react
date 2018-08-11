import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Card from 'components/bootstrap/Card';
import Loading from 'components/Loading';
import ServerError from 'components/ServerError';

import saga from '../saga';
import messages from '../messages';
import { makeSelectUser } from '../../UserProvider/selectors';
import {
  makeSelectUserTeam,
  makeSelectUserTeamCreateErrors,
  makeSelectUserTeamErrors,
  makeSelectUserTeamIsUpdate,
  makeSelectUserTeamProgress,
} from '../selectors';
import { create, get, update, updateValue } from '../actions';
import reducer from '../reducer';
import { ROUTE_USER_DASHBOARD } from '../../User/route-names';
import TeamForm from './TeamForm';
import RowJustify from '../../../components/bootstrap/RowJustify';

/* eslint-disable react/prefer-stateless-function */
export class UserTeamForm extends React.PureComponent {
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

    if (this.props.isUpdate) {
      this.props.dispatch(
        update(this.props.user.get('token'), this.props.item.toJS()),
      );
    } else {
      this.props.dispatch(
        create(this.props.user.get('token'), this.props.item.toJS()),
      );
    }
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
      <RowJustify size={6}>
        <Card
          url={ROUTE_USER_DASHBOARD}
          title={<FormattedMessage {...messages.header} />}
        >
          <TeamForm
            state={this.props.item}
            handleInputChange={this.handleInputChange}
            submitForm={this.submitForm}
            isUpdate={this.props.isUpdate}
            errors={this.props.errors}
          />
        </Card>
      </RowJustify>
    );
  }
}

UserTeamForm.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object,
  errors: PropTypes.object,
  serverError: PropTypes.bool,
  isUpdate: PropTypes.bool,
  user: PropTypes.object,
  inProgress: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  isUpdate: makeSelectUserTeamIsUpdate(),
  item: makeSelectUserTeam(),
  serverError: makeSelectUserTeamErrors(),
  errors: makeSelectUserTeamCreateErrors(),
  inProgress: makeSelectUserTeamProgress(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'userTeamForm', saga });
const withReducer = injectReducer({ key: 'userTeam', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(UserTeamForm);
