import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { FETCH, FIND, SUBSCRIBE } from './constants';
import { fetchApi, getApi, subscribeApi } from './api';
import {
  fetchError,
  fetchSuccess,
  getError,
  getSuccess,
  subscribeError,
  subscribeSuccess,
} from './actions';
import { ROUTE_USER_TOURNAMENT } from '../User/route-names';
import { API_RETRY_COUNT, API_RETRY_TIMEOUT } from '../../globals';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* fetchSaga(action, count = 0) {
  try {
    const res = yield call(fetchApi, action.token, action.page);
    yield put(fetchSuccess(res.data));
  } catch (e) {
    const newCount = count + 1;
    if (newCount < API_RETRY_COUNT) {
      yield delay(API_RETRY_TIMEOUT);
      yield call(fetchSaga, action, newCount);
    }
    yield put(fetchError(e.response));
  }
}

function* getSaga(action, count = 0) {
  try {
    const res = yield call(getApi, action.token, action.id);
    yield put(getSuccess(res.data));
  } catch (e) {
    const newCount = count + 1;
    if (newCount < API_RETRY_COUNT) {
      yield delay(API_RETRY_TIMEOUT);
      yield call(getSaga, action, newCount);
    }

    yield put(getError(e.response));
  }
}

function* subscribeSaga(action) {
  try {
    const res = yield call(subscribeApi, action.token, action.data);
    yield put(subscribeSuccess(res.data));
    yield put(push(ROUTE_USER_TOURNAMENT));
  } catch (e) {
    yield put(subscribeError(e.response));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(FETCH, fetchSaga);
  yield takeEvery(FIND, getSaga);
  yield takeEvery(SUBSCRIBE, subscribeSaga);
}
