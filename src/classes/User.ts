export default interface User {
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
  role: 1|2,
  created_at: number,
  updated_at: number,
  access_token?: string,
}

export const ROLE_OWNER = 1;
export const ROLE_MANAGER = 2;