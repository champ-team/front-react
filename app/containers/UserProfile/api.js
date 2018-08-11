import axios from 'axios/index';
import { API_ROOT } from '../../api-config';

const ROUTE = 'user';

export function getApi(token) {
  return axios({
    method: 'get',
    url: `${API_ROOT}/${ROUTE}/profile`,
    headers: { token },
  });
}

export function updateApi(token, data) {
  return axios({
    method: 'post',
    url: `${API_ROOT}/${ROUTE}/save`,
    headers: { token },
    data,
  });
}
