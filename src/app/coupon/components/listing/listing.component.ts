import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { UtilService } from '../../../shared/services';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'coupon-listing',
  templateUrl: './listing.html'
})
export class CouponsComponent implements OnInit {

  public isLoading = false;
  public coupons = [];
  public page: Number = 1;
  public take: Number = 10;
  public total: Number = 0;
  public searchText: any = '';
  public sortOption: any = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };

  constructor(
    private router: Router,
    private couponService: CouponService,
    private toasty: ToastyService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.query();
  }

  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    let params = {
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      q: this.searchText,
    };

    this.couponService.find(params).then((res) => {
      this.coupons = res.data.items;
      this.total = res.data.count;
      this.utilService.setLoading(false);
      this.isLoading = false;
    }).catch((err) => {
      this.toasty.error(err.data.message || 'Something went wrong, please try again!');
      this.utilService.setLoading(false);
      this.isLoading = false;
    });
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
  }

  remove(itemId: any, index: number) {
    if (window.confirm('Are you sure want to delete this item?')) {
      this.couponService.remove(itemId)
        .then(() => {
          this.toasty.success('Item has been deleted!');
          this.coupons.splice(index, 1);
        })
        .catch((err) => this.toasty.error(err.data.message || 'Something went wrong, please try again!'));
    }
  }
}
