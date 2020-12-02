import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComplainComponent } from '../profile-complain/profile-complain.component';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'profile-update',
  templateUrl: './form.html'
})
export class ProfileUpdateComponent implements OnInit {
  public info: any = {};
  public avatarUrl = '';
  public isSubmitted = false;
  public avatarOptions: any = {};
  public user: any = {};
  private userId: string;
  private phoneNumber: string = '';
  isVerified = false

  @ViewChild('phoneverificationmodal') verificationmodal: ElementRef;
  @ViewChild('ngxIntlTelInput') ngxIntlTelInput: ElementRef;

  constructor(private router: Router, private userService: UserService, private toasty: ToastyService, private route: ActivatedRoute, private modalService: NgbModal) {
    userService.me().then(resp => {
     
      this.isVerified = resp.data.phoneVerified;
      this.phoneNumber = resp.data.phoneNumber;
      this.user = resp.data;
      this.info = _.pick(resp.data, [
        'name', 'email', 'address', 'phoneNumber'
      ]);
      this.avatarUrl = resp.data.avatarUrl;
    });
   }

  ngOnInit() {
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/users/avatar',
      fileFieldName: 'avatar',
      onFinish: (resp) => {
        this.avatarUrl = resp.data.url;
        this.user.avatarUrl = resp.data.url;
      }
    }; 
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }
    this.info.phoneVerified = this.isVerified
    if(!this.info.phoneVerified) {
      return this.toasty.error('Phone verification is pending!');
    }
    delete this.info.phoneVerified;
    this.info.phoneNumber = this.info.phoneNumber.e164Number;

    this.userService.updateMe(this.info).then(resp => {
      this.toasty.success('Updated successfuly!');
      this.setPhoneNumber();
    }).catch((err) => {
      this.setPhoneNumber();
      this.toasty.error(err.data.data.message || err.data.data.email)
    });
  }

  complain() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    this.modalService.open(ProfileComplainComponent, ngbModalOptions);
  }

  setPhoneNumber() {  

    let dialcode = '+'+ this.ngxIntlTelInput['selectedCountry']['dialCode']
    let number = this.ngxIntlTelInput['value'].replace(dialcode, '')
    this.info.phoneNumber = number;
  }

  changePhoneNumber(ev) {
    
    if(ev && ev.e164Number) {
      console.log(ev)
      let newph = ev.e164Number;
      if(newph != this.phoneNumber) {
        this.isVerified = false
      } else this.isVerified = true
    } else this.isVerified = false
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setPhoneNumber();
    }, 1000)
  }

  onVerifyApprove(ev) {
    if(ev == true) {
      this.isVerified = true
    } else this.isVerified = false
  }

}
