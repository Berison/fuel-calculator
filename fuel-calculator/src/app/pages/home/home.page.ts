import { Component, OnInit } from '@angular/core';
import { IonHomePageModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
import { AddCarFabComponent } from './components/add-car-fab/add-car-fab.component';
import { CarsComponent } from './components/cars/cars.component';
@Component({
  selector: 'fc-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHomePageModule,
    TranslatePipe,
    AddCarFabComponent,
    CarsComponent,
  ],
})
export class HomePage implements OnInit {
  ngOnInit(): void {}
}
