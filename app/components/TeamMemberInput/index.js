import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { API_ROOT } from '../../api-config';
import './style.css';

/* eslint-disable react/prefer-stateless-function */
class TeamMemberInput extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.state = props.state;
    this.state = {
      suggestions: [],
    };

    this.handleMemberSelect = this.handleMemberSelect.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
  }

  handleMemberChange(event) {
    const { target } = event;
    const { value } = target;

    this.setState(
      {
        id: '',
        name: value,
      },
      () => {
        if (value.length > 2) {
          // this.props.dispatch(findMemberByName(this.props.user.token, value));
          axios({
            method: 'get',
            url: `${API_ROOT}/client/getMember`,
            headers: { token: this.props.token },
            params: { query: value },
          }).then(res => {
            this.setState({
              suggestions: res.data.suggestions,
            });
          });
        }
      },
    );
  }

  handleMemberSelect(id, name) {
    this.setState(
      {
        id,
        name,
      },
      () => {
        this.props.handleMemberChange(this.state);
      },
    );
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.memberPlaceholder}>
          {placeholder => (
            <input
              name="airport"
              type="text"
              className="form-control"
              id="Member"
              placeholder={placeholder}
              value={this.state.name}
              onChange={this.handleMemberChange}
              autoComplete="off"
            />
          )}
        </FormattedMessage>
        {this.state.id === '' && (
          <div>
            {this.state.suggestions.length > 0 && (
              <div className="airportOptions">
                {this.state.suggestions.map(city => (
                  <button
                    key={city.data}
                    onClick={() =>
                      this.handleMemberSelect(city.data, city.value)
                    }
                  >
                    {city.value}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
TeamMemberInput.propTypes = {
  state: PropTypes.object,
  handleMemberChange: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = state => ({
  token: state.getIn(['user', 'user', 'token']),
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

export default compose(withConnect)(TeamMemberInput);
