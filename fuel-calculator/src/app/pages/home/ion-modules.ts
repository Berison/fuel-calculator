import { NgModule } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

const MODULES = [IonContent, IonToolbar, IonHeader, IonTitle];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonHomePageModule {}
