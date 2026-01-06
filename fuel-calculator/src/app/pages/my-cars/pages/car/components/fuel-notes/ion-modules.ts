import { NgModule } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonNote,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { egg } from 'ionicons/icons';

const MODULES = [
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonNote,
  IonText,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonFuelNotesModule {
  constructor() {
    addIcons({ egg });
  }
}
