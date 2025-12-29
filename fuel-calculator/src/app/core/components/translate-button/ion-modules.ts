import { NgModule } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';

const MODULES = [IonFab, IonFabButton, IonIcon, IonFabList];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonTranslateButtonModule {}
