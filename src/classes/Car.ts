export default interface Car {
  id: number,
  daily_price: number,
  licence_plate: string,
  serial_number: string,
  manufacturer: string,
  model_name: string,
  model_year: number,
  fiscal_horse_power: number,
  number_of_cylinders: number,
  transmission_type: 1|2,
  fuel_type: 1|2,
  type: 1|2,
  first_circulation_date: string,
  circulation_tax_ends_at: number,
  insurance_ends_at: number,
  technical_control_ends_at: number,
  total_price?: number,
  created_at: number,
  updated_at: number,
}

export const TRANSMISSION_TYPE_MANUAL = 1;
export const TRANSMISSION_TYPE_AUTO = 2;

export const FUEL_TYPE_GAS = 1;
export const FUEL_TYPE_PETROL = 2;

export const TYPE_COMPACT = 1;
export const TYPE_SEDAN = 2;
