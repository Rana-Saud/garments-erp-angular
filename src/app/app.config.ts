import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { API_BASE_URL } from './core/config/api.config';
import { environment } from '../environments/environment';

// Global error handler to suppress third-party errors
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    // Suppress checkout/payment extension errors
    if (error.message?.includes('checkout') || error.message?.includes('popup')) {
      console.warn('Third-party extension error (ignored):', error.message);
      return;
    }
    console.error('Application error:', error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    // API base url
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },

    // HTTP interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
};
