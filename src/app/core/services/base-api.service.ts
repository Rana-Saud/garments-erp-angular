import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_BASE_URL } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class BaseApiService {
  private http = inject(HttpClient);
  private baseUrl = '';

  constructor() {
    const url = inject(API_BASE_URL, { optional: true });
    if (url) this.setBaseUrl(url);
  }

  setBaseUrl(url: string) {
    this.baseUrl = url?.replace(/\/$/, '');
  }

  private fullUrl(path: string) {
    if (!path) return this.baseUrl;
    const cleaned = path.startsWith('/') ? path.slice(1) : path;
    return `${this.baseUrl}/${cleaned}`;
  }

  get<T>(path: string, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;
    return this.http.get<T>(this.fullUrl(path), { params: httpParams }).pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.fullUrl(path), body).pipe(catchError(this.handleError));
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(this.fullUrl(path), body).pipe(catchError(this.handleError));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.fullUrl(path)).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error('API error', err);
    return throwError(() => err);
  }
}
