import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInput, IonItem } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

type Model = string | number;

@Component({
  selector: 'fc-input-item',
  template: ` <ion-item>
    <ion-input
      [ngModel]="model()"
      (ngModelChange)="modelChange.emit($event)"
      [labelPlacement]="labelPlacement() | translate"
      [label]="label() | translate"
      [placeholder]="placeholder() | translate"
    ></ion-input>
  </ion-item>`,
  imports: [IonInput, IonItem, FormsModule, TranslatePipe],
})
export class InputItemComponent {
  readonly model = input.required<Model>();
  readonly modelChange = output<Model>();

  readonly labelPlacement = input<string>('');
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
}
