import axios from 'axios';
import Car from '../classes/Car';
import { getUserToken } from "../support/auth";
import { API_URL } from '../constants';

export function index({ queryKey }): Promise<Car> {
  let params = {};
  try {
    const [_key, { search }] = queryKey;
    params = { search };
  } catch (error) {}

  return getUserToken().then(token => {
      return axios.get(API_URL + 'car', { params, headers: { Authorization: 'Bearer ' + token }}).then(response => {
        return response.data.data;
      });
  });
}

export function show({ queryKey }): Promise<Car> {
  const [_key, { id }] = queryKey;

  return getUserToken().then(token => {
      return axios.get(API_URL + 'car/' + id, { headers: { Authorization: 'Bearer ' + token }}).then(response => {
        console.log(JSON.stringify(response.data.data, null, 2))
        return response.data.data;
      });
  });
}