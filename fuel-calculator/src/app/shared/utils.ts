import { inject } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

export function createGetTranslateByKey$() {
  const translate = inject(TranslateService);

  return (key: string) => translate.get(_(key));
}
