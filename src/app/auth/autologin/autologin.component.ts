import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';

@Component({
  /*templateUrl: 'autologin.component.html'*/
})
export class AutoLoginComponent {
  Auth: AuthService;
  credentials: any = {
    email: '',
    token: ''
  };
  logoUrl: any;

  constructor(
    auth: AuthService, 
    public router: Router, 
    private route: ActivatedRoute, 
    private toasty: ToastyService) {
    this.logoUrl = route.snapshot.data['appConfig'] ? route.snapshot.data['appConfig'].siteLogo : '/assets/images/logo.jpg';
    this.Auth = auth;

    //This is to auto login
    let token = this.route.snapshot.paramMap.get('token');
    if(token && token != ''){
        this.Auth.autoLogin({
          token: token
        }).then((resp) => {
          if(resp.autoLoginToken) {
            this.Auth.removeLoginToken(resp.autoLoginToken)
          }
          this.router.navigate(['/']);
        }).catch(err => {
          console.log(err);
          this.toasty.error(err.data.message);
          this.router.navigate(['/']);
        })  
    } 
  }
}
