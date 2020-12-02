import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { LocationService, UtilService } from '../../../shared/services';
import * as _ from 'lodash';
import Mcc from '../../../../assets/mcc.json';


@Component({
  selector: 'account-update',
  templateUrl: './form.html'
})
export class AccountUpdateComponent implements OnInit {

  public isSubmitted: boolean = false;
  public account: any;
  public isUpdate:boolean =  true;
  companyCountries: any[] = [];
  userCountries: any[] = [];
  companyStates:any[] = [];
  userStates:any[] = [];
  mccList: any[] = [];

  constructor(
    private router: Router, 
    private accountService: AccountService, 
    private route: ActivatedRoute, 
    private toasty: ToastyService,
    private location:LocationService,
    private utilService: UtilService) {
      this.mccList = Mcc;

      // this.companyCountries = accountService.countries;
      // this.userCountries = accountService.countries;
      this.location.countries().then((resp) => {
        this.companyCountries = resp.data;
        this.userCountries = resp.data;
      });
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.accountService.findOne(id).then(resp => {
      this.account = resp.data;
      console.log(resp.data)
      if(resp.data.type === 'stripe') {
        this.fillStripeForm()
      }
    });

  }


  fillStripeForm() {
    let value = this.account.company.address.country;
    
    let selectedCountry = this.companyStates.filter(data => data.isoCode === value);

    if(selectedCountry.length > 0){
      this.location.states({country: selectedCountry[0].isoCode}).then((resp) => {
        this.companyStates = resp.data;
      });
    }

    let userCountry = this.account.personal.address.country;
    let selectedUserCountry = this.userCountries.filter(data => data.isoCode === userCountry);

    console.log(selectedUserCountry);
    if(selectedUserCountry.length > 0){
      this.location.states({country: selectedUserCountry[0].isoCode}).then((resp) => {
        this.userStates = resp.data;
      });
    }
    
    
  }

  onChangeDOB(e) {
    let value = e.target.value;
    this.account.personal.dateOfBirth = value;
  }
  
  onChangeCompanyCountry(e) {
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


  submit(frm) {
    this.isSubmitted = true;
    if (frm.$invalid) {
      this.toasty.error('Invalid form, please try again.');
    }

    if (this.account.type === 'paypal' && this.account.paypalAccount == '') {
      return this.toasty.error('If you select type payout is paypal, please enter Paypal Account');
    } else if (this.account.type === 'bank-account' && this.account.paypalAccount) {
      this.account.paypalAccount = '';
    }


    let param;

    if(this.account.type=== 'stripe') {
      param = {
        /*country: this.account.country,*/
        accountId:this.account.accountId,
        personId:this.account.personId,
        type: this.account.type,
        account_type:this.account.account_type,
        currency: this.account.currency,
        mcc: this.account.mcc,
        businessName: this.account.businessName,
        description: this.account.description,
        url: this.account.url,
        company: {
          address: {
            companyline1: this.account.company.address.companyline1,
            companyline2: this.account.company.address.companyline2,
            companyPostalCode: this.account.company.address.companyPostalCode,
            companyCity: this.account.company.address.companyCity,
            companyState: this.account.company.address.companyState,
            dialcode: this.account.company.address.dialcode,
            phone: this.account.company.address.phone,
            country:this.account.company.address.country
          },
          taxId: this.account.company.taxId,
          vatId: this.account.company.vaxId,
          name: this.account.company.name,
        },
        account: {
          accountHolderName: this.account.account.accountHolderName,
          routingNumber: this.account.account.routingNumber,
          accountNumber: this.account.account.accountNumber
        },
        personal: {
          firstName: this.account.personal.firstName,
          lastName: this.account.personal.lastName,
          dateOfBirth: this.account.personal.dateOfBirth,
          address: {
            line1: this.account.personal.address.line1,
            line2: this.account.personal.address.line2,
            postalCode: this.account.personal.address.postalCode,
            city: this.account.personal.address.city,
            state: this.account.personal.address.state,
            country: this.account.personal.address.country
          },
          ssnLast4: this.account.personal.ssnLast4  
        }
      }
    } else {
      param = {
        type: this.account.type,
        paypalAccount: this.account.paypalAccount,
        accountHolderName: this.account.accountHolderName,
        accountNumber: this.account.accountNumber,
        iban: this.account.iban,
        bankName: this.account.bankName,
        bankAddress: this.account.bankAddress,
        sortCode: this.account.sortCode,
        routingNumber: this.account.routingNumber,
        swiftCode: this.account.swiftCode,
        ifscCode: this.account.ifscCode,
        routingCode: this.account.routingCode,
      }
    }

    console.log(param)
    this.accountService.update(this.account._id, param).then(resp => {
      this.toasty.success('Updated successfully.');
    })
  }
}
