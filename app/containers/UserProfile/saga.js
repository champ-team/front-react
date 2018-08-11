import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { FIND, UPDATE } from './constants';
import { updateApi, getApi } from './api';
import { getError, getSuccess, updateError, updateSuccess } from './actions';
import { ROUTE_USER_DASHBOARD } from '../User/route-names';
import { API_RETRY_COUNT, API_RETRY_TIMEOUT } from '../../globals';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* getSaga(action, count = 0) {
  try {
    const res = yield call(getApi, action.token);
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
    const res = yield call(updateApi, action.token, action.data);
    yield put(updateSuccess(res.data));
    yield put(push(ROUTE_USER_DASHBOARD));
  } catch (e) {
    yield put(updateError(e.response));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(FIND, getSaga);
  yield takeEvery(UPDATE, updateSaga);
}
