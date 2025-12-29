import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly paletteToggle = signal(false);

  init() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);

    prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkPalette(mediaQuery.matches)
    );
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle.set(isDark);
    this.toggleDarkPalette(isDark);
  }

  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}
