import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'aniVaultAuth';

  loggedIn = signal(false);

  private readonly demoUser = {
    email: 'admin@anivault.com',
    password: 'admin123'
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.loadSession();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadSession(): void {
    if (!this.isBrowser()) return;

    const session = localStorage.getItem(this.storageKey);

    if (!session) {
      this.loggedIn.set(false);
      return;
    }

    const parsedSession = JSON.parse(session);
    this.loggedIn.set(parsedSession.loggedIn === true);
  }

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();

    const isValid =
      normalizedEmail === this.demoUser.email &&
      password === this.demoUser.password;

    if (isValid && this.isBrowser()) {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          email: normalizedEmail,
          loggedIn: true
        })
      );

      this.loggedIn.set(true);
    }

    return isValid;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }

    this.loggedIn.set(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }
}