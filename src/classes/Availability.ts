import Car from "./Car";

export default interface Availability {
  car: Car,
  period: [number, number],
}