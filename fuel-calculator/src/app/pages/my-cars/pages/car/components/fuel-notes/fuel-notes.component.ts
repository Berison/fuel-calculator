import { Component, input } from '@angular/core';
import { IonFuelNotesModule } from './ion-modules';
import { FuelEntry } from 'src/app/shared/models/fuel.type';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'fc-fuel-notes',
  templateUrl: 'fuel-notes.component.html',
  imports: [IonFuelNotesModule, DatePipe, TranslatePipe],
})
export class FuelNotesComponent {
  fuelNotes = input.required<FuelEntry[] | null>();
}
