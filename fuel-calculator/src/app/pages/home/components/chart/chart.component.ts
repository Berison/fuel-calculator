import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { map } from 'rxjs';
import { FuelEntry } from 'src/app/shared/models/fuel.type';
import { buildConsumptionSeries } from 'src/app/shared/utils';

const MOCK: FuelEntry[] = [
  {
    date: '2025-12-05',
    liters: 36,
    priceUAH: 2050,
    km: 121350,
    fullTank: true,
  },
  {
    date: '2025-12-15',
    liters: 28,
    priceUAH: 1640,
    km: 121780,
    fullTank: false,
  },
  {
    date: '2025-12-23',
    liters: 34,
    priceUAH: 1990,
    km: 122180,
    fullTank: true,
  },
  {
    date: '2026-01-02',
    liters: 41,
    priceUAH: 2460,
    km: 122680,
    fullTank: true,
  },
  {
    date: '2026-01-12',
    liters: 29,
    priceUAH: 1765,
    km: 123090,
    fullTank: false,
  },
  {
    date: '2026-01-22',
    liters: 38,
    priceUAH: 2330,
    km: 123540,
    fullTank: true,
  },
];

const consumption = buildConsumptionSeries(MOCK);

const xDates = MOCK.slice()
  .sort((a, b) => a.date.localeCompare(b.date))
  .map((e) => e.date);

@Component({
  selector: 'fc-chart',
  template: ` <div echarts [options]="options()" class="chart"></div> `,
  imports: [NgxEchartsModule],
})
export class ChartComponent {
  private readonly translateService = inject(TranslateService);

  private chartText = toSignal(
    this.translateService
      .stream([
        'charts.fuel.consumption',
        'charts.fuel.refuelCost',
        'charts.fuel.lPer100',
        'charts.fuel.uah',
      ])
      .pipe(
        map((res) => ({
          consumption: res['charts.fuel.consumption'],
          refuelCost: res['charts.fuel.refuelCost'],
          lPer100: res['charts.fuel.lPer100'],
          uah: res['charts.fuel.uah'],
        }))
      ),
    { initialValue: { consumption: '', refuelCost: '', lPer100: '', uah: '' } }
  );

  options = computed<EChartsOption>(() => {
    const t = this.chartText();

    return {
      grid: { left: 48, right: 54, top: 24, bottom: 48 },

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },

      legend: { top: 0, data: [t.consumption, t.refuelCost] },

      xAxis: {
        type: 'category',
        data: xDates,
        axisLabel: { formatter: (v: string) => v.slice(5) },
      },

      yAxis: [
        {
          type: 'value',
          name: t.lPer100,
          min: (val: any) => Math.max(0, Math.floor(val.min - 1)),
          max: (val: any) => Math.ceil(val.max + 1),
        },
        {
          type: 'value',
          name: t.uah,
          min: 0,
        },
      ],

      dataZoom: [
        { type: 'inside', start: 0, end: 100 },
        { type: 'slider', height: 22, bottom: 16, start: 0, end: 100 },
      ],

      series: [
        {
          name: t.refuelCost,
          type: 'bar',
          yAxisIndex: 1,
          data: MOCK.slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((e) => e.priceUAH),
          tooltip: { valueFormatter: (v: any) => `${v} ${t.uah}` },
        },
        {
          name: t.consumption,
          type: 'line',
          smooth: true,
          showSymbol: true,
          symbolSize: 8,
          data: xDates.map((d) => {
            const p = consumption.find((c) => c.date === d);
            return p ? p.lPer100 : null;
          }),
          connectNulls: false,
          tooltip: {
            valueFormatter: (v: any) => (v == null ? '-' : `${v} ${t.lPer100}`),
          },
        },
      ],
    };
  });
}
