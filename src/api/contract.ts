import axios from 'axios';
import Car from '../classes/Car';
import { getUserToken } from "../support/auth";
import { API_URL } from '../constants';
import Contract from '../classes/Contract';

export function index({ queryKey }): Promise<Contract[]> {
  let params = {};
  try {
    const [_key, { search, starts_at, ends_at }] = queryKey;
    params = { search, starts_at, ends_at };
  } catch (error) {}

  return getUserToken().then(token => {
      return axios.get(API_URL + 'contract', { params, headers: { Authorization: 'Bearer ' + token }}).then(response => {
        return response.data.data;
      });
  });
}
