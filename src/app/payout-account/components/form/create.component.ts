import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { LocationService, UtilService } from '../../../shared/services';
import { StripeService, StripeCardComponent, StripeElementsService, } from 'ngx-stripe';
import Mcc from '../../../../assets/mcc.json';

import {
  StripeElements,
  StripeAuBankAccountElement,
  StripeAuBankAccountElementOptions,
  StripeAuBankAccountElementChangeEvent
} from '@stripe/stripe-js';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-create',
  templateUrl: './form.html'
})
export class AccountCreateComponent implements OnInit {

  public isSubmitted: boolean = false;

  dateOfBirth: String = '';
  companyCountries: any[] = [];
  userCountries: any[] = [];
  companyStates:any[] = [];
  userStates:any[] = [];
  public isUpdate:boolean =  false;

  public account: any = {
    type: 'bank-account',
    account_type:'individual',
    paypalAccount: '',
    accountNumber: '',
    bankName: '',
    bankAddress: '',
    iban: '',
    swiftCode: '',
    sortCode: '',
    routingNumber: '',
    ifscCode: '',
    routingCode: '',
    //country: '',
    currency: 'usd',
    mcc: '',
    businessName: '',
    description: '',
    url: '',
    company: {
      address: {
        companyline1: '',
        companyline2: '',
        companyPostalCode: '',
        companyCity: '',
        companyState: '',
        Country: '',
        dialcode: '',
        phone: '',
        country:''
      },
      taxId: '',
      vatId: '',
      name: '',
    },
    account: {
      accountHolderName: '',
      routingNumber: "",
      accountNumber: ""
    },
    personal: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: {
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
        state: '',
        country: ''
      },
      ssnLast4: ''
    }
  }

  mccList: any[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toasty: ToastyService,
    private stripeService: StripeService,
    private location:LocationService,
    private utilService: UtilService) {

      this.location.countries().then((resp) => {
        this.companyCountries = resp.data;
        this.userCountries = resp.data;
      });

      this.mccList = Mcc;
      
      // this.companyCountries = accountService.countries
      // this.userCountries = accountService.countries


    }

  
  ngOnInit() {
    this.currentDate()
  }

  currentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = 0 + dd
    }
    if (mm < 10) {
      mm = 0 + mm
    }

    this.account.personal.dateOfBirth = yyyy - 13 + '-' + mm + '-' + dd; 
  }

  onChangeDOB(e) {
    let value = e.target.value;
    this.account.personal.dateOfBirth = value;
  }

  public selectDial(event) {
    this.account.company.address.dialcode = event;
  }


  onChangeCompanyCountry(e) {

    e.preventDefault();
    let value = e.target.value;
    let selectedCountry = this.companyCountries.filter(data => data.isoCode === value);

    if(selectedCountry)
    {
      this.location.states({country: selectedCountry[0].isoCode}).then((resp) => {
        this.companyStates = resp.data;
        this.utilService.setLoading(false);
      });
    }
    //this.account.currency = selectedCountry[0].currencyCode;
  }

  onChangeUsersCountry(e) {

    this.utilService.setLoading(true);
    let value = e.target.value;
    let selectedCountry = this.userCountries.filter(data => data.isoCode === value);

    if(selectedCountry)
    {
      this.location.states({country: selectedCountry[0].isoCode}).then((resp) => {
        this.userStates = resp.data;
        this.utilService.setLoading(false);
      });
    }
    
    //this.userStates = selectedCountry[0].states;
    console.log(this.userStates);
    //this.account.currency = selectedCountry[0].currencyCode;
  }



  submit(frm: any) {
    this.isSubmitted = true;
    if (frm.invalid) {
      this.isSubmitted = false;
      return this.toasty.error('Form is invalid, please try again.');
    }


    if (this.account.type === 'paypal' && this.account.paypalAccount == '') {
      this.isSubmitted = false;
      return this.toasty.error('If you select type payout is paypal, please enter Paypal Account');
    }


    this.accountService.create(this.account)
      .then(() => {
        this.toasty.success('Account has been created, please wait for verification from us');
        this.router.navigate(['/accounts/list']);
      }, err => {
        this.isSubmitted = false;
        this.toasty.error(err.data.message || err.data.data.message || 'Something went wrong, please check and try again!');
      })
  }

  onChangeAccount(e) {
    let value = e.target.value;

    this.account = {
      type: value,
      paypalAccount: '',
      accountNumber: '',
      bankName: '',
      bankAddress: '',
      iban: '',
      swiftCode: '',
      sortCode: '',
      routingNumber: '',
      ifscCode: '',
      routingCode: '',
      //country: '',
      currency: 'usd',
      mcc: '',
      businessName: '',
      description: '',
      url: '',
      company: {
        address: {
          companyline1: '',
          companyline2: '',
          companyPostalCode: '',
          companyCity: '',
          companyState: '',
          dialcode: '',
          phone: '',
          country:''
        },
        taxId: '',
        vatId: '',
        name: '',
      },
      account: {
        accountHolderName: '',
        routingNumber: "",
        accountNumber: ""
      },
      personal: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: {
          line1: '',
          line2: '',
          postalCode: '',
          city: '',
          state: '',
          country:''
        },
        ssnLast4: ''
      }
    }

    if (value === 'stripe') {
      this.account.company.address.dialcode = '+1';
    }
  }
}
