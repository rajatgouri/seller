import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AutoLoginComponent } from './autologin/autologin.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ConfigResolver } from '../shared/resolver';

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      {
      path: 'login',
      component: LoginComponent,
      resolve: { appConfig: ConfigResolver }
    }, {
      path: 'register',
      component: RegisterComponent,
      resolve: { appConfig: ConfigResolver }
    },
    {
      path: 'forgot',
      component: ForgotComponent,
      resolve: { appConfig: ConfigResolver }
    },
    {
      path: 'autologin/:token',
      component: AutoLoginComponent,
      /*resolve: { appConfig: ConfigResolver }*/
    }
  ]
  }
];
