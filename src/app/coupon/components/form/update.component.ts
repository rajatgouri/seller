import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'coupon-update',
  templateUrl: './form.html'
})
export class CouponUpdateComponent implements OnInit {

  public isSubmitted: boolean = false;
  public coupon: any;
  public date: any = {
    year: '',
    month: '',
    day: ''
  };

  constructor(private router: Router, private couponService: CouponService, private route: ActivatedRoute, private toasty: ToastyService) {
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.couponService.findOne(id).then(resp => {
      this.coupon = resp.data;
      this.date.year = Number(resp.data.expiredTime.substr(0, 4));
      this.date.month = Number(resp.data.expiredTime.substr(5, 2));
      this.date.day = Number(resp.data.expiredTime.substr(8, 2)) + 1;
    });
  }

  submit(frm) {
    this.isSubmitted = true;
    if (frm.$invalid) {
      this.toasty.error('Invalid form, please try again.');
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

    let param = {
      name: this.coupon.name,
      code: this.coupon.code,
      discountPercentage: this.coupon.discountPercentage,
      limit: this.coupon.limit,
      expiredTime: this.coupon.expiredTime
    }

    this.couponService.update(this.coupon._id, param).then(resp => {
      this.toasty.success('Updated successfully.');
    })
  }
}
