import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../shop.service';
import { LocationService } from '../../../shared/services/location.service';
import * as _ from 'lodash';

@Component({
  selector: 'shop-shipping-info',
  templateUrl: './shop-shipping-info.html'
})
export class ShopShippingInfoComponent implements OnInit {
  @Input() shop: any;
  public isSubmitted = false;
  public countries: any = [];

  constructor(private toasty: ToastyService, private shopService: ShopService, private location: LocationService) { }

  ngOnInit() {
    this.location.countries().then(resp => this.countries = resp.data);
  }
  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }
    const data = _.pick(this.shop, ['shippingSettings', 'storeWideShipping']);

    this.shopService.update(this.shop.id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch((err) => this.toasty.error(err.data.data.message));
  }
}
