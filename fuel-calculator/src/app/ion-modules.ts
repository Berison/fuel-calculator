import { NgModule } from '@angular/core';
import {
  IonApp,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { languageOutline } from 'ionicons/icons';

const MODULES = [
  IonApp,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonAppModule {
  constructor() {
    addIcons({ languageOutline });
  }
}
