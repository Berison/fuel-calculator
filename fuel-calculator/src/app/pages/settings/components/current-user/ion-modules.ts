import { NgModule } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from '@ionic/angular/standalone';

const MODULES = [
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonCurrentUserComponentModule {}
