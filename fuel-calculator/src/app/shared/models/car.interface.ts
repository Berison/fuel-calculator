export interface Car {
  id: string;
  name: string;
  year: number;
  color: string;
  engineSize: string;
  createdAt?: Date;
}

export type NewCar = Omit<Car, 'id' | 'createdAt'>;
