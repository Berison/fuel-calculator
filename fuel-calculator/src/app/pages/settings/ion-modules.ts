import { NgModule } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

const MODULES = [IonContent, IonToolbar, IonHeader, IonTitle, IonButton];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonSettingsPageModule {}
