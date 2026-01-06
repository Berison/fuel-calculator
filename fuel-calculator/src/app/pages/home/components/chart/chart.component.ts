import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { of, switchMap } from 'rxjs';
import {
  CarMonthSummary,
  ChartsService,
} from 'src/app/core/services/charts.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/ui/theme.service';

@Component({
  selector: 'fc-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  template: `<div echarts [options]="options()" class="chart"></div>`,
  styles: [
    `
      .chart {
        height: 320px;
        width: 100%;
      }
    `,
  ],
})
export class ChartComponent {
  private readonly charts = inject(ChartsService);
  private readonly auth = inject(AuthService);
  private readonly theme = inject(ThemeService);

  private readonly uid = computed(() => this.auth.user()?.uid);

  private readonly summary = toSignal(
    toObservable(this.uid).pipe(
      switchMap((uid) =>
        uid
          ? this.charts.getThisMonthSummary$(uid)
          : of([] as CarMonthSummary[])
      )
    ),
    { initialValue: [] as CarMonthSummary[] }
  );

  readonly options = computed<EChartsOption>(() => {
    const isDark = this.theme.paletteToggle();

    const textColor = isDark ? '#E5E7EB' : '#111827';
    const axisLineColor = isDark ? '#6B7280' : '#9CA3AF';
    const gridLineColor = isDark
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.08)';
    const bgColor = isDark ? 'transparent' : 'transparent';

    const rows = this.summary();
    const names = rows.map((x) => x.name);
    const money = rows.map((x) => Math.round(x.moneyUAH));
    const liters = rows.map((x) => Number(x.liters.toFixed(1)));

    return {
      backgroundColor: bgColor,
      color: isDark
        ? ['#60A5FA', '#34D399'] // dark series colors
        : ['#2563EB', '#059669'], // light series colors

      tooltip: {
        trigger: 'axis',
        textStyle: { color: textColor },
        backgroundColor: isDark ? '#111827' : '#FFFFFF',
        borderColor: isDark ? '#374151' : '#E5E7EB',
      },

      legend: {
        top: 0,
        textStyle: { color: textColor },
      },

      grid: { left: 48, right: 16, top: 32, bottom: 48 },

      xAxis: {
        type: 'category',
        data: names,
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: axisLineColor } },
        axisTick: { lineStyle: { color: axisLineColor } },
      },

      yAxis: {
        type: 'value',
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: axisLineColor } },
        splitLine: { lineStyle: { color: gridLineColor } },
      },

      series: [
        { name: 'UAH', type: 'bar', data: money },
        { name: 'Liters', type: 'bar', data: liters },
      ],
    };
  });
}
