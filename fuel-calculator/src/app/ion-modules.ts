import { NgModule } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { languageOutline } from 'ionicons/icons';

const MODULES = [IonApp, IonRouterOutlet];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonAppModule {
  constructor() {
    addIcons({ languageOutline });
  }
}
