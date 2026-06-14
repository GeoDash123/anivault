import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'aniVaultAuth';

  private readonly demoUser = {
    email: 'admin@anivault.com',
    password: 'admin123'
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
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
    }

    return isValid;
  }

  logout(): void {
    if (!this.isBrowser()) return;

    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;

    const session = localStorage.getItem(this.storageKey);

    if (!session) return false;

    return JSON.parse(session).loggedIn === true;
  }
}