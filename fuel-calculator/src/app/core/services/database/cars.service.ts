import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  serverTimestamp,
  doc,
  deleteDoc,
  docData,
  getDoc,
} from '@angular/fire/firestore';
import { from, map, Observable, take, tap } from 'rxjs';
import { Car, NewCar } from 'src/app/shared/models/car.interface';
import { ToastService } from '../ui/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class CarsService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private toast = inject(ToastService);
  private translate = inject(TranslateService);

  /** Get uid or throw an error if not logged in */
  private getUid(): string | undefined {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      this.toast.error('User not logged in');
      return undefined;
    }
    return uid;
  }

  /** List of cars for the current user */
  getCars$(): Observable<Car[]> {
    const uid = this.getUid();

    const carsRef = collection(this.firestore, `users/${uid}/cars`);
    return collectionData(carsRef, { idField: 'id' }) as Observable<Car[]>;
  }

  /** Get one car by id for the current user */
  getCar$(carId: string): Observable<Car | null> {
    const uid = this.getUid();

    const carRef = doc(this.firestore, `users/${uid}/cars/${carId}`);
    return docData(carRef, { idField: 'id' }) as Observable<Car>;
  }

  /** Get one car ONCE by id (no realtime stream) */
  getCarOnce$(carId: string): Observable<Car> {
    const uid = this.getUid();

    const carRef = doc(this.firestore, `users/${uid}/cars/${carId}`);

    return from(getDoc(carRef)).pipe(
      map((snap) => {
        if (!snap.exists())
          this.translate
            .get('toast.errors.car-not-found')
            .pipe(take(1))
            .subscribe((m) => this.toast.error(m));
        return { id: snap.id, ...(snap.data() as Omit<Car, 'id'>) } as Car;
      })
    );
  }

  /** Add a car to the current user */
  addCar(car: NewCar) {
    const uid = this.getUid();
    const carsRef = collection(this.firestore, `users/${uid}/cars`);

    return addDoc(carsRef, {
      name: car.name,
      year: car.year,
      color: car.color,
      engineSize: car.engineSize,
      createdAt: serverTimestamp(),
    });
  }

  /** Delete the car to the current user */
  async deleteCar(carId: string): Promise<void> {
    const uid = this.getUid();
    const carRef = doc(this.firestore, `users/${uid}/cars/${carId}`);
    await deleteDoc(carRef);
  }
}
