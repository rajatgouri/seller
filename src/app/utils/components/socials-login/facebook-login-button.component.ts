import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../shared/services';
import { Router } from '@angular/router';
import { SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'facebook-login',
  template: '<button class="btn btn-warning btn-block" (click)="signInWithFacebook()"><i class="fa fa-facebook"></i> facebook</button>'
})
export class FacebookLoginButtonComponent {
  private Auth: AuthService;
  @Output() onConnected = new EventEmitter();

  constructor(private translate: TranslateService, private router: Router, auth: AuthService, private socialAuthService: SocialAuthService, private toasty: ToastyService) {
    this.Auth = auth;
  }

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((resp) => {
        this.Auth.connectFacebook(resp.authToken)
          .then(() => {
            this.toasty.success('Your Facebook account has been connected!');
            this.onConnected.emit({ platform: 'facebook', success: true }), () => (null);
          })
      })
      .catch(err => this.toasty.error(this.translate.instant('Something went wrong, please try again.')));
  }
}
