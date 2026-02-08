import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(username: string, password: string): boolean {
    if (username && password) {
      // In real app, call API and store returned token
      const fakeToken = 'Bearer_token_' + username;
      localStorage.setItem(this.TOKEN_KEY, fakeToken);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.checkToken();
  }

  private checkToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }
}
