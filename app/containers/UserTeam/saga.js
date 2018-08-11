import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE, FIND, UPDATE } from './constants';
import { createApi, updateApi, getApi } from './api';
import {
  createError,
  createSuccess,
  getError,
  getSuccess,
  updateError,
  updateSuccess,
} from './actions';
import { API_RETRY_COUNT, API_RETRY_TIMEOUT } from '../../globals';
import { ROUTE_USER_DASHBOARD } from '../User/route-names';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* createSaga(action) {
  try {
    const res = yield call(createApi, action.token, action.data);
    yield put(createSuccess(res.data));
    yield put(push(ROUTE_USER_DASHBOARD));
  } catch (e) {
    yield put(createError(e.response));
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

function* updateSaga(action) {
  try {
    yield call(updateApi, action.token, action.data);
    yield put(push(ROUTE_USER_DASHBOARD));
    yield put(updateSuccess());
  } catch (e) {
    yield put(updateError(e.response));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(CREATE, createSaga);
  yield takeEvery(FIND, getSaga);
  yield takeEvery(UPDATE, updateSaga);
}
