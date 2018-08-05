/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Error from '../FormErrorMessages/Error';

function TextInputGroup({ state, name, text, handleInputChange, error }) {
  const textLabel =
    text !== undefined ? text : name.charAt(0).toUpperCase() + name.slice(1);
  const errorData = error ? error[name] : null;
  return (
    <div className="form-group">
      <label htmlFor={name}>{textLabel}</label>
      <input
        name={name}
        type="text"
        className={`form-control${errorData ? ' is-invalid' : ''}`}
        id={name}
        placeholder={`Enter ${textLabel}`}
        onChange={handleInputChange}
        value={state}
      />
      <Error errorMessages={errorData} />
    </div>
  );
}

TextInputGroup.propTypes = {
  state: PropTypes.any,
  name: PropTypes.string,
  text: PropTypes.string,
  handleInputChange: PropTypes.func,
  error: PropTypes.object,
};

export default TextInputGroup;
