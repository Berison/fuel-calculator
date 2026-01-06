import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { ChartsService } from './charts.service';

describe('ChartsService', () => {
  let service: ChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartsService, { provide: Firestore, useValue: {} }],
    });

    service = TestBed.inject(ChartsService);
  });

  afterEach(() => {
    try {
      jasmine.clock().uninstall();
    } catch {}
  });

  it('should return range for January 2026: [Jan 1, Feb 1)', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 0, 15, 12, 0, 0)); // 15 Jan 2026

    const { start, end } = (service as any).getMonthRange();

    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(0); // Jan
    expect(start.getDate()).toBe(1);
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    expect(start.getSeconds()).toBe(0);

    expect(end.getFullYear()).toBe(2026);
    expect(end.getMonth()).toBe(1); // Feb
    expect(end.getDate()).toBe(1);
    expect(end.getHours()).toBe(0);
    expect(end.getMinutes()).toBe(0);
    expect(end.getSeconds()).toBe(0);
  });

  it('should correctly roll over year end (Dec -> Jan)', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2025, 11, 31, 23, 59, 59)); // 31 Dec 2025,

    const { start, end } = (service as any).getMonthRange();

    expect(start.getFullYear()).toBe(2025);
    expect(start.getMonth()).toBe(11); // Dec
    expect(start.getDate()).toBe(1);

    expect(end.getFullYear()).toBe(2026);
    expect(end.getMonth()).toBe(0); // Jan
    expect(end.getDate()).toBe(1);
  });
});
