import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../shop.service';
import * as _ from 'lodash';

@Component({
  selector: 'shop-business-info',
  templateUrl: './shop-business-info.html'
})
export class ShopBusinessInfoComponent implements OnInit {
  @Input() shop: any;
  public isSubmitted = false;

  // TODO - add option to query user from server by user id
  constructor(private toasty: ToastyService, private shopService: ShopService){ }

  ngOnInit() {
    // TODO - add event emitter listen the change
  }
  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }
    const data = _.pick(this.shop, ['businessInfo']);

    this.shopService.update(this.shop.id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch ((err) => this.toasty.error(err.data.data.message));
  }
}
