import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ServerError from 'components/ServerError';
import Loading from 'components/Loading';
import Paginator from 'components/Paginator';
import Card from 'components/bootstrap/Card';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectUserTournaments,
  makeSelectUserTournamentErrors,
  makeSelectUserTournamentProgress,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectUserToken } from '../UserProvider/selectors';
import { fetch } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class UserTournament extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.props.dispatch(fetch(this.props.token, page));
  }

  componentDidMount() {
    this.props.dispatch(fetch(this.props.token));
  }
  render() {
    if (this.props.inProgress) {
      return <Loading />;
    }

    if (this.props.errors) {
      return <ServerError />;
    }

    return (
      <Card title={<FormattedMessage {...messages.header} />}>
        {this.props.items
          .get('data')
          .toJS()
          .map(tournament => <div>Tournament: {tournament.name}</div>)}
        <Paginator
          page={this.props.items.get('page')}
          count={this.props.items.get('count')}
          total={this.props.items.get('total')}
          selectPageCallback={this.changePage}
        />
      </Card>
    );
  }
}

UserTournament.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object,
  token: PropTypes.string.isRequired,
  inProgress: PropTypes.bool,
  errors: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectUserTournaments(),
  token: makeSelectUserToken(),
  inProgress: makeSelectUserTournamentProgress(),
  errors: makeSelectUserTournamentErrors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userTournament', reducer });
const withSaga = injectSaga({ key: 'userTournament', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserTournament);
