import {
  FETCH,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FIND,
  FIND_ERROR,
  FIND_SUCCESS,
  SUBSCRIBE_ERROR,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE,
} from './constants';

export function fetch(token, page) {
  return {
    type: FETCH,
    token,
    page,
  };
}

export function fetchError(message) {
  return {
    type: FETCH_ERROR,
    message,
  };
}

export function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    data,
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

export function subscribe(token, data) {
  return {
    type: SUBSCRIBE,
    token,
    data,
  };
}

export function subscribeSuccess(data) {
  return {
    type: SUBSCRIBE_SUCCESS,
    data,
  };
}

export function subscribeError(message) {
  return {
    type: SUBSCRIBE_ERROR,
    message,
  };
}
