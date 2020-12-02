import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'last-order-card',
  templateUrl: './last-order-card.html'
})
export class LastOrderCardComponent implements OnInit {

  public orders = [];
  public params: any = {
    page: 1,
    take: 5
  };

  constructor(private router: Router, private orderService: OrderService, private toasty: ToastyService) {
  }

  ngOnInit() {
    this.orderService.find(this.params).then((res) => {
      this.orders = res.data.items;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

}
