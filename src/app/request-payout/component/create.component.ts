import { Component, OnInit, Input } from '@angular/core';
import { RequestPayoutService } from '../request-payout.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'create-request-payout',
  templateUrl: './form.html'
})
export class CreateRequestPayoutComponent implements OnInit {
  public balance: any = {};
  public payoutAccountId: any = '';
  public accounts = [];
  // public today = new Date();
  // public toDate: any;
  constructor(private router: Router, private payoutService: RequestPayoutService, private toasty: ToastyService) {
  }

  ngOnInit() {
    this.getBalance();

    this.payoutService.findAccount({
      take: 50,
      sortBy: 'createdAt',
      sortType: 'desc'
    }).then((res) => {
      this.accounts = res.data.items;
    }).catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

  getBalance() {
    this.payoutService.getBalance()
      .then(resp => {
        this.balance = resp.data;
      })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }
  // selectDateTo() {
  //   this.toDate = new Date(this.toDate.year, this.toDate.month, this.toDate.day).toUTCString();
  // }
  submit() {
    if (!this.payoutAccountId) {
      return this.toasty.error('Please enter Payout Account Id');
    }
    this.payoutService.create({ payoutAccountId: this.payoutAccountId }).then(res => {
      this.toasty.success('Your request has been sent.');
      this.router.navigate(['/requestPayout']);
    })
      .catch(err => {
        this.toasty.error(err.data.message || err.data.data.message || 'Something went wrong, please try again')
      });
  }
}
