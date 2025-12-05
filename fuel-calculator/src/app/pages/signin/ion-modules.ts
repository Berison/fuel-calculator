import { NgModule } from '@angular/core';
import {
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, eyeOffOutline, lockClosed } from 'ionicons/icons';

const MODULES = [IonContent, IonList, IonItem, IonInput, IonButton, IonIcon];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonSigninModule {
  constructor() {
    addIcons({ eye, lockClosed, eyeOffOutline });
  }
}
