import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { FuelEntry } from 'src/app/shared/models/fuel.type';

type Car = { id: string; name: string };

export type CarMonthSummary = {
  carId: string;
  name: string;
  liters: number;
  moneyUAH: number;
};

@Injectable({ providedIn: 'root' })
export class ChartsService {
  private readonly fs = inject(Firestore);

  getThisMonthSummary$(uid: string) {
    const { start, end } = this.getMonthRange();

    const carsRef = collection(this.fs, `users/${uid}/cars`);
    return collectionData(carsRef, { idField: 'id' }).pipe(
      map((cars) => cars as unknown as Car[]),
      switchMap((cars) => {
        if (!cars.length) return of([] as CarMonthSummary[]);

        const perCar$ = cars.map((car) => {
          const fuelRef = collection(
            this.fs,
            `users/${uid}/cars/${car.id}/fuel`
          );
          const q = query(
            fuelRef,
            where('date', '>=', Timestamp.fromDate(start)),
            where('date', '<', Timestamp.fromDate(end))
          );

          return collectionData(q, { idField: 'id' }).pipe(
            map((rows) => rows as unknown as FuelEntry[]),
            map((fuel) => {
              const liters = fuel.reduce(
                (s, x) => s + (Number(x.liters) || 0),
                0
              );
              const moneyUAH = fuel.reduce(
                (s, x) => s + (Number(x.priceUAH) || 0),
                0
              );

              return {
                carId: car.id,
                name: car.name ?? car.id,
                liters,
                moneyUAH,
              } as CarMonthSummary;
            })
          );
        });

        return combineLatest(perCar$);
      })
    );
  }

  private getMonthRange() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
    return { start, end };
  }
}
