import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'fc-to-cars-button',
  template: `<ion-button
    [routerLink]="['/tabs/my-cars']"
    expand="block"
    shape="round"
    fill="outline"
    >{{ 'pages.home.to-cars-button' | translate }}</ion-button
  >`,
  imports: [IonButton, TranslatePipe, RouterLink],
})
export class ToCarsButtonComponent {}
