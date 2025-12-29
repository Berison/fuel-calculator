import { Component, OnInit } from '@angular/core';
import { IonHomePageModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'fc-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHomePageModule, TranslatePipe],
})
export class HomePage implements OnInit {
  ngOnInit(): void {}
}
