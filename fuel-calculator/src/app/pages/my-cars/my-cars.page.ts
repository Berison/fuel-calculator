import { Component } from '@angular/core';
import { IonMyCarsPageModule } from './ion-modules';
import { AddCarFabComponent } from './components/add-car-fab/add-car-fab.component';
import { CarsComponent } from './components/cars/cars.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'fc-my-cars',
  templateUrl: 'my-cars.page.html',
  imports: [
    IonMyCarsPageModule,
    TranslatePipe,
    AddCarFabComponent,
    CarsComponent,
  ],
})
export class MyCarsPage {}
