import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { CarsService } from 'src/app/core/services/database/cars.service';
import { ToastService } from 'src/app/core/services/ui/toast.service';
import { FuelEntry } from 'src/app/shared/models/fuel.type';

@Injectable()
export class CarPageFacade {
  private readonly carsService = inject(CarsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toast = inject(ToastService);

  public readonly fuelNotes = signal<FuelEntry[] | null>(null);
  public readonly loading = signal(false);

  init(carId: string) {
    this.loading.set(true);

    this.carsService
      .getFuelNotes$(carId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: FuelEntry[]) => this.fuelNotes.set(res),
        error: (err) => this.toast.error(err),
        complete: () => this.loading.set(false),
      });
  }
}
