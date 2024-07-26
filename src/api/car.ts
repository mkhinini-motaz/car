import axios from 'axios';
import Car from '../classes/Car';
import { getUserToken } from "../support/auth";
import { API_URL } from '../constants';

export function index(): Promise<Car> {
  return getUserToken().then(token => {
      return axios.get(API_URL + 'car', { headers: { Authorization: 'Bearer ' + token }}).then(response => {
        console.log(response.data.data)
        return response.data.data;
      });
  });
}