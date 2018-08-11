import axios from 'axios/index';
import { API_ROOT } from '../../api-config';

const ROUTE = 'tournament';

export function fetchApi(token, page) {
  return axios({
    method: 'get',
    url: `${API_ROOT}/${ROUTE}?page=${page || 0}`,
    headers: {
      token,
    },
  });
}

export function getApi(token, id) {
  return axios({
    method: 'get',
    url: `${API_ROOT}/${ROUTE}/find/${id}`,
    headers: { token },
  });
}

export function subscribeApi(token, id) {
  return axios({
    method: 'get',
    url: `${API_ROOT}/${ROUTE}/subscribe/${id}`,
    headers: { token },
  });
}
