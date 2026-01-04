import { inject } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { FuelEntry } from './models/fuel.type';

export function createGetTranslateByKey$() {
  const translate = inject(TranslateService);

  return (key: string) => translate.get(_(key));
}

export function buildConsumptionSeries(entries: FuelEntry[]) {
  const full = entries
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((e) => e.fullTank);

  const points: { date: string; lPer100: number }[] = [];

  for (let i = 1; i < full.length; i++) {
    const prev = full[i - 1];
    const cur = full[i];
    const distance = cur.km - prev.km;
    if (distance <= 0) continue;

    const lPer100 = (cur.liters / distance) * 100;
    points.push({ date: cur.date, lPer100: +lPer100.toFixed(1) });
  }

  return points;
}
