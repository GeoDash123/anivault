import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'aniVaultTheme';

  isDark = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadTheme();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadTheme(): void {
    if (!this.isBrowser()) return;

    const savedTheme = localStorage.getItem(this.storageKey);

    if (savedTheme === 'dark') {
      this.isDark.set(true);
      this.applyTheme(true);
      return;
    }

    this.isDark.set(false);
    this.applyTheme(false);
  }

  toggleTheme(): void {
    const nextTheme = !this.isDark();

    this.isDark.set(nextTheme);
    this.applyTheme(nextTheme);

    if (this.isBrowser()) {
      localStorage.setItem(
        this.storageKey,
        nextTheme ? 'dark' : 'light'
      );
    }
  }

  private applyTheme(isDark: boolean): void {
    if (!this.isBrowser()) return;

    const root = this.document.documentElement;

    if (isDark) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
  }
}