import { NgModule } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

const MODULES = [IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonCarInfoComponentModule {}
