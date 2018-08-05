import axios from 'axios/index';
import { API_ROOT } from '../../api-config';

export function authorize(credentials) {
  return axios({
    method: 'post',
    url: `${API_ROOT}/login`,
    data: credentials,
  });
}

export function checkTokenApi(token) {
  return axios({
    method: 'get',
    url: `${API_ROOT}/me`,
    headers: { token },
  });
}
