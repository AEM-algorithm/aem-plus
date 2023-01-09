// modules
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// app
import { AppModule } from './app/app.module';

// environments
import { environment } from './environments/environment';

// utils
import './utils/console';

if (environment.production) {
  enableProdMode();
}
declare global {
  interface Window {
    appConfig;
    appData;
  }
}
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
