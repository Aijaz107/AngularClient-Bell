import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

/**
 * Application configuration
 *
 * This central file lists providers used by the standalone application.
 * It configures the HttpClient, router, and an optimized change detection
 * strategy. For production builds the `apiUrl` in services should be
 * overridable via environment-specific providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};