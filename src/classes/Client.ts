import Contract from "./Contract";

export default interface User {
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
  birth_date: string,
  id_number: string,
  driver_licence_number: string,
  driver_licence_delivery_date: string,
  contracts?: Contract[],
  gender: 1|2,
  created_at: number,
  updated_at: number,
}

export const GENDER_MALE = 1;
export const GENDER_FEMALE = 2;