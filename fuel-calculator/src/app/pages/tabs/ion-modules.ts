import { NgModule } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, settingsOutline } from 'ionicons/icons';

const MODULES = [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonTabsModule {
  constructor() {
    addIcons({ homeOutline, settingsOutline });
  }
}
