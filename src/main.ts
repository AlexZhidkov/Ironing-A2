import { enableProdMode, provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { APP_BASE_HREF, ROUTER_PROVIDERS } from 'angular2/router';

// root component
import { App } from 'components/app/app';

// core
import { AUTH_PROVIDERS } from 'core/auth/providers';
import { ORDER_PROVIDERS } from 'core/order/providers';
import { CLIENT_PROVIDERS } from 'core/client/providers';
import { STAFF_PROVIDERS } from 'core/staff/providers';
import { PROFILE_PROVIDERS } from 'core/profile/providers';
import { PRICE_PROVIDERS } from 'core/price/providers';

// global styles
import './styles/styles.scss';


if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}


Firebase.INTERNAL.forceWebSockets();


bootstrap(App, [
  ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  ORDER_PROVIDERS,
  CLIENT_PROVIDERS,
  STAFF_PROVIDERS,
  PROFILE_PROVIDERS,
  PRICE_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'})
]).catch((error: Error) => console.error(error));
