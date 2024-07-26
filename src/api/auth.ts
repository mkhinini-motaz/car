import axios from 'axios';
import { API_URL } from "../constants";
import User from "../classes/User";
import { getUserToken } from "../support/auth";
import Translatable from "../classes/Translatable";

export function login({ phone, password }): Promise<User> {
  return axios.post(API_URL + 'login', { phone, password })
    .then(response => response.data)
}

export function me(): Promise<User> {
  return getUserToken().then(token => {
    return axios.get(API_URL + 'me', { headers: { Authorization: 'Bearer ' + token } }).then(response => response.data);
  });
}

// TODO: implement api
export function updateProfile({ first_name, last_name, gender, birth_date, phone, otp = undefined }): Promise<User> {
  return getUserToken().then(token => {
    return axios.post(API_URL + 'profile', { first_name, last_name, gender, birth_date, otp, phone }, { headers: { Authorization: 'Bearer ' + token } })
      .then(response => response.data)
  });
}

// TODO: implement api
export function updatePassword({ current_password, password, password_confirmation }): Promise<User> {
  return getUserToken().then(token => {
    return axios.post(API_URL + 'password', { current_password, password, password_confirmation }, { headers: { Authorization: 'Bearer ' + token } })
      .then(response => response.data)
  });
}

// TODO: implement api
export function resetPassword({ password, password_confirmation, otp, phone }): Promise<User> {
  return axios.post(API_URL + 'password/reset', { password, password_confirmation, otp, phone })
    .then(response => response.data)
}

// TODO: implement api
export function requestOtp(phone: string, lang: keyof Translatable): Promise<void> {
  return axios.post(API_URL + 'api/otp/request', { phone, lang })
}