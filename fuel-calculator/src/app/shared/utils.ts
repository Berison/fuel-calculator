import { inject } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FuelEntry } from './models/fuel.type';

export function createGetTranslateByKey$() {
  const translate = inject(TranslateService);

  return (key: string) => translate.get(_(key));
}
