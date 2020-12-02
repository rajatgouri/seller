import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../shop.service';
import * as _ from 'lodash';

@Component({
  selector: 'shop-bank-info',
  templateUrl: './shop-bank-info.html'
})
export class ShopBankInfoComponent implements OnInit {
  @Input() shop: any;
  public isSubmitted = false;

  constructor(private toasty: ToastyService, private shopService: ShopService){ }

  ngOnInit() {
  }
  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }
    const data = _.pick(this.shop, ['bankInfo']);

    this.shopService.update(this.shop.id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch ((err) => this.toasty.error(err.data.data.message));
  }
}
