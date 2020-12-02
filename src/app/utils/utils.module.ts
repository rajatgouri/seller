import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DialCodeComponent } from './components/dial-number/dial.component';

// social login, check document here https://github.com/abacritt/angularx-social-login#readme
import { SocialAuthService, SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { GoogleLoginButtonComponent } from './components/socials-login/google-login-button.component';
import { FacebookLoginButtonComponent } from './components/socials-login/facebook-login-button.component';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule.forChild()
  ],
  declarations: [
    DialCodeComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent
  ],
  exports: [
    TranslateModule,
    DialCodeComponent,

    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.googleClientId,
            {
              scope: 'profile email'
            } as any
          ),
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(
            environment.facebookAppId,
            {
              scope: 'email',
              return_scopes: true,
              enable_profile_selector: true
            } as any
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  }]
})
export class UtilsModule { }
