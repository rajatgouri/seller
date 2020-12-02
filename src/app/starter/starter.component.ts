import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

import { MessageService } from '../message/services/message.service';
import { StatService } from '../shared/services';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {

  public shop: any = {};
  public latestMessages: any = [];
  public orderStat: any = {};
  public productStat: any = {};
  public transactionStat: any = {};
  public saleStat: any = {};

  constructor(private shopService: ShopService, private statService: StatService, private toasty: ToastyService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.statQuery();

    this.shopService.me().then((res) => {
      this.shop = res.data;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));

    this.messageService.latest({
      take: 4
    }).then(resp => this.latestMessages = resp.data.items);
  }

  statQuery() {
    this.statService.orderStat().then(resp => {
      this.orderStat = resp.data;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));

    this.statService.prodStat().then(resp => {
      this.productStat = resp.data;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));


    this.statService.saleStat().then(resp => {
      this.saleStat = resp.data;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }
}
