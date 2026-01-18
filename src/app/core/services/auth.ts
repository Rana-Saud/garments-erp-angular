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
      // In real app, call API
      localStorage.setItem(this.TOKEN_KEY, 'Bearer_token_' + username);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.checkToken();
  }

  private checkToken(): boolean {
    return true;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }
}
