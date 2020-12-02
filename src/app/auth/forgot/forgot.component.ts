import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';

@Component({
	templateUrl: 'forgot.html'
})
export class ForgotComponent {
	public email: string = '';
	public submitted: boolean = false;
	private Auth: AuthService;
	public logoUrl: any;

	constructor(auth: AuthService, public router: Router, private route: ActivatedRoute, private toasty: ToastyService) {
		this.logoUrl = route.snapshot.data['appConfig'] ? route.snapshot.data['appConfig'].siteLogo : '/assets/images/logo.jpg';
		this.Auth = auth;
	}

	forgot(frm: any) {
		this.submitted = true;
		this.Auth.forgot(this.email).then((resp) => {
			this.toasty.success('New password has been sent, please check your email inbox.');
			this.email = '';
			this.submitted = false;
			frm.reset();
		})
			.catch((err) => this.toasty.error(err.data.data.message))
	}
}
