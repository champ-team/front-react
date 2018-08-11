import {
  FIND,
  FIND_ERROR,
  FIND_SUCCESS,
  UPDATE,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
  UPDATE_VALUE,
} from './constants';

export function updateValue(field, value) {
  return {
    type: UPDATE_VALUE,
    field,
    value,
  };
}

export function get(token) {
  return {
    type: FIND,
    token,
  };
}

export function getSuccess(data) {
  return {
    type: FIND_SUCCESS,
    data,
  };
}

export function getError(message) {
  return {
    type: FIND_ERROR,
    message,
  };
}

export function update(token, data) {
  return {
    type: UPDATE,
    token,
    data,
  };
}

export function updateSuccess(data) {
  return {
    type: UPDATE_SUCCESS,
    data,
  };
}

export function updateError(message) {
  return {
    type: UPDATE_ERROR,
    message,
  };
}
