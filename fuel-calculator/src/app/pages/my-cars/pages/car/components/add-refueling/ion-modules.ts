import { NgModule } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonInput,
  IonNote,
  IonCheckbox,
} from '@ionic/angular/standalone';

const MODULES = [
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonInput,
  IonNote,
  IonCheckbox,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonAddRefuelingModule {}
