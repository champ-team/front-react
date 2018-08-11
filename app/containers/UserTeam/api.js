import axios from 'axios/index';
import { API_ROOT } from '../../api-config';

const ROUTE = 'team';

export function createApi(token, data) {
  return axios({
    method: 'post',
    url: `${API_ROOT}/${ROUTE}/add`,
    headers: { token },
    data,
  });
}

export function getApi(token) {
  return axios({
    method: 'get',
    url: `${API_ROOT}/${ROUTE}/find`,
    headers: { token },
  });
}

export function updateApi(token, data) {
  return axios({
    method: 'post',
    url: `${API_ROOT}/${ROUTE}/update/${data.id}`,
    headers: { token },
    data,
  });
}

export function deleteApi(token, id) {
  return axios({
    method: 'get',
    url: `${API_ROOT}/${ROUTE}/delete/${id}`,
    headers: { token },
  });
}
