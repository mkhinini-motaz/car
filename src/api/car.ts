import axios from 'axios';
import Car from '../classes/Car';
import { getUserToken } from "../support/auth";
import { API_URL } from '../constants';

export function index({ queryKey }): Promise<Car> {
  const [_key, { search }] = queryKey;
  console.log({_key, queryKey})
  const params = { search };

  return getUserToken().then(token => {
      return axios.get(API_URL + 'car', { params, headers: { Authorization: 'Bearer ' + token }}).then(response => {
        return response.data.data;
      });
  });
}