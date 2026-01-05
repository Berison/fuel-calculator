export type FuelEntry = {
  date: string;
  liters: number;
  priceUAH: number;
  km: number;
  fullTank: boolean;
};

export type NewFuelEntry = Omit<FuelEntry, 'date'>;
