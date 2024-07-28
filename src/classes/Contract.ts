import Car from "./Car";
import Client from "./Client";

export default interface Contract {
  id: number,
  daily_price: number,
  starts_at: number,
  ends_at: number,
  client_id: number,
  car_id: number,
  car?: Car,
  client?: Client,

  created_at: number,
  updated_at: number,
}