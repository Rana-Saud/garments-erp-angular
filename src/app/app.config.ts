import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

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
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
