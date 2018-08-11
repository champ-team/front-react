import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import NotFoundPage from 'containers/NotFoundPage';
import Container from 'components/bootstrap/Container';

import Navbar from './Navbar';
import {
  makeSelectIsAuthorized,
  makeSelectUser,
} from '../UserProvider/selectors';
import Routes from './routes';

/* eslint-disable react/prefer-stateless-function */
export class User extends React.PureComponent {
  render() {
    // Закоментить для работы пока нет авторизации
    if (!this.props.isAuthorized || this.props.user.get('role') !== 'Client') {
      return <Redirect to="/login" />;
    }

    let key = 0;

    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark scrolling-navbar"
          style={{ marginBottom: '15px' }}
        >
          <div className="container">
            <Link to="/" className="navbar-brand" href="/">
              <strong>Champ</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <Navbar />
          </div>
        </nav>
        <Container>
          <Switch>
            {Routes.map(route => {
              key += 1;
              return (
                <Route
                  key={key}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </div>
    );
  }
}

User.propTypes = {
  isAuthorized: PropTypes.bool,
  user: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectIsAuthorized(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(User);
