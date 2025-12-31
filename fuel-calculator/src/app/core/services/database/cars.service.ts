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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car, NewCar } from 'src/app/shared/models/car.interface';
import { ToastService } from '../ui/toast.service';

@Injectable({ providedIn: 'root' })
export class CarsService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private toast = inject(ToastService);

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
