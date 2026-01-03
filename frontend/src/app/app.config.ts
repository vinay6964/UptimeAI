import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Import ECharts modules
import { NgxEchartsModule } from 'ngx-echarts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Add this line to initialize ECharts
    importProvidersFrom(NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }))
  ]
};