import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../shop.service';
import * as _ from 'lodash';

@Component({
  selector: 'shop-basic-info',
  templateUrl: './shop-basic-info.html'
})
export class ShopBasicInfoComponent implements OnInit, OnChanges, AfterViewInit{
  @Input() shop: any;

  public isSubmitted = false;
  public phoneNumber = '';
  public isVerified = true;

  @ViewChild('phoneverificationmodal') verificationmodal: ElementRef;
  @ViewChild('ngxIntlTelInput') ngxIntlTelInput: ElementRef;
  constructor(private toasty: ToastyService, private shopService: ShopService) { }

  ngOnInit() { 
  }
  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }

    if(!this.isVerified) {
      return this.toasty.error('Phone verification is pending!');
    }    

    let data = _.pick(this.shop, ['name', 'alias', 'address', 'city', 'state', 'country', 'zipcode', 'email',
      'phoneNumber', 'logoId', 'verificationIssueId', 'bannerId', 'headerText', 'gaCode', 'announcement', 'returnAddress']);

    data.phoneNumber = data.phoneNumber.e164Number
      this.shopService.update(this.shop.id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch((err) =>
      this.toasty.error(err.data.data.message || err.data.data.details[0].message)
    );
  }
  selectLogo(data: any) {
    this.shop.logoId = data._id;
    this.shop.logo = data;
  }
  selectVerificationIssue(data: any) {
    this.shop.verificationIssueId = data._id;
    this.shop.verificationIssue = data;
  }
  selectBanner(data: any) {
    this.shop.bannerId = data._id;
    this.shop.banner = data;
  }

  ngOnChanges(changes) {
    if(changes.shop) {
      this.phoneNumber = this.shop.phoneNumber
    }
  }

  setPhoneNumber() {  

    let dialcode = '+'+ this.ngxIntlTelInput['selectedCountry']['dialCode']
    let number = this.ngxIntlTelInput['value'].replace(dialcode, '')
    this.shop.phoneNumber = number;
  }

  changePhoneNumber(ev) {
    console.log(this.phoneNumber)
    if(ev && ev.e164Number) {
      console.log(ev)
      let newph = ev.e164Number;
      if(newph != this.phoneNumber) {
        this.isVerified = false
      } else {
        this.isVerified = true
      } 
    } else {
      this.isVerified = false
    }

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
