import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'shop-update',
  templateUrl: './shop-update.html'
})
export class ShopUpdateComponent implements OnInit {
  public isSubmitted = false;
  public shop: any = {};
  public tab: string = 'basic';
  public twitterConnectLink = '';
  public socialConnected: any = {};

  constructor(private router: Router, private shopService: ShopService, private toasty: ToastyService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.shopService.me().then(resp => {
      this.shop = resp.data;
      this.socialConnected = resp.data.socialConnected;
    });

    const redirectUrl = window.location.href;
    const accessToken = this.authService.getAccessToken();
    this.twitterConnectLink = `${window.appConfig.apiBaseUrl}/connect/twitter?access_token=${accessToken}&redirectUrl=${redirectUrl}`;
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  onConnected(data) {
    this.socialConnected[data.platform] = data.success;
  }
}
