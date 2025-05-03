
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

export interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  carModel: string;
  carBrand: string;
  pricePerDay: number;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  firstName?: string;
  lastName?: string;
  email?: string;
}
