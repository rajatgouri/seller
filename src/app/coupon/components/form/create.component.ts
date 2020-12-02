import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'coupon-create',
  templateUrl: './form.html'
})
export class CouponCreateComponent implements OnInit {

  public isSubmitted: any = false;
  public coupon: any = {
    name: '',
    code: '',
    discountPercentage: 0,
    limit: 0
  };
  public date: any;

  constructor(private router: Router, private couponService: CouponService, private toasty: ToastyService) {
  }

  ngOnInit() {
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (frm.invalid) {
      return this.toasty.error('Form is invalid, please try again.');
    }

    if (this.coupon.discountPercentage < 0 || this.coupon.discountPercentage > 100) {
      return this.toasty.error('Discount percentage ranges from 0 to 100');
    }

    if (this.coupon.limit < 0) {
      return this.toasty.error('Limit can not enter negative');
    }

    if (this.date) {
      this.coupon.expiredTime = new Date(this.date.year, this.date.month - 1, this.date.day).toUTCString();
    } else return this.toasty.error('Please select experied time!');

    this.couponService.create(this.coupon)
      .then(() => {
        this.toasty.success('Coupon has been created');
        this.router.navigate(['/coupons/list']);
      }, err => this.toasty.error(err.data.data.message || 'Something went wrong!'));

  }
}
