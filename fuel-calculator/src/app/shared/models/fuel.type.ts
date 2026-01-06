import { Timestamp } from 'firebase/firestore';

export type FuelEntry = {
  date: Timestamp;
  liters: number;
  priceUAH: number;
  km: number;
  fullTank: boolean;
  id: string;
};

export type NewFuelEntry = Omit<FuelEntry, 'date' | 'id'>;
