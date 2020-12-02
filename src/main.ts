import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Window { appConfig: any; }
}

//export version and build number to global
window.appConfig = environment;

// update access token if have in the query before using in whole app
function getParameterByName(name, url = '') {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const accessToken = getParameterByName('access_token');
if (accessToken) {
  localStorage.setItem('accessToken', accessToken);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
