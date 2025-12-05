import { Component } from '@angular/core';
import { IonHeaderModule } from './ion-modules';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fc-header',
  imports: [IonHeaderModule, RouterModule],
  template: ` <ion-header collapse="fade" class="ion-no-border"
    ><ion-toolbar>
      <ion-title class="ion-padding">
        <div class="app-logo" routerLink="/home">
          <img alt="Logo" src="assets/logo.png" />
          <span>Fuel calculator</span>
        </div>
      </ion-title>
    </ion-toolbar></ion-header
  >`,
  styles: `.app-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
  }
}
`,
})
export class FCHeader {}
