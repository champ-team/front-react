import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { ROUTE_USER_DASHBOARD } from '../route-names';

const ITag = ({ className }) => <i className={className} />;

ITag.propTypes = {
  className: PropTypes.string,
};

const StyledI = styled(ITag)`
  margin-right: 5px;
`;

const Navbar = () => (
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink
          exact
          to={ROUTE_USER_DASHBOARD}
          className="nav-link"
          activeClassName="active"
        >
          <StyledI className="fa fa-tachometer-alt" />
          <FormattedMessage {...messages.dashboard} />
        </NavLink>
      </li>
    </ul>
  </div>
);

Navbar.propTypes = {};

export default Navbar;
