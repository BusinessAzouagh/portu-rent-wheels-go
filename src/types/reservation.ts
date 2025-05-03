
import { Car } from "./cars";

export interface ReservationFormData {
  firstName: string;
  lastName: string;
  phone: string;
  nationalId?: string;
  email?: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  nationalId: string;
  email: string;
}
