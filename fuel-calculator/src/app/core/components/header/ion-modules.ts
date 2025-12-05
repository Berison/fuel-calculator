import { NgModule } from '@angular/core';
import { IonToolbar, IonTitle, IonHeader } from '@ionic/angular/standalone';

const MODULES = [IonToolbar, IonTitle, IonHeader];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class IonHeaderModule {}
