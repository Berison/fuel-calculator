import { Component } from '@angular/core';
import { IonTabsModule } from './ion-modules';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'fc-tabs-bottom',
  templateUrl: 'tabs.page.html',
  imports: [IonTabsModule, TranslatePipe],
})
export class TabsPage {}
