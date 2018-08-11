import {
  RESET,
  CREATE,
  CREATE_ERROR,
  CREATE_SUCCESS,
  FIND,
  FIND_ERROR,
  FIND_SUCCESS,
  UPDATE,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
  UPDATE_VALUE,
} from './constants';

export function reset(user) {
  return {
    type: RESET,
    user,
  };
}

export function updateValue(field, value) {
  return {
    type: UPDATE_VALUE,
    field,
    value,
  };
}

export function create(token, data) {
  return {
    type: CREATE,
    token,
    data,
  };
}

export function createSuccess(data) {
  return {
    type: CREATE_SUCCESS,
    data,
  };
}

export function createError(message) {
  return {
    type: CREATE_ERROR,
    message,
  };
}

export function get(token, id) {
  return {
    type: FIND,
    token,
    id,
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
