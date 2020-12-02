import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatService {
  constructor(private restangular: Restangular) { }

  orderStat(): Promise<any> {
    return this.restangular.one('orders/seller/stats').get().toPromise();
  }

  prodStat(): Promise<any> {
    return this.restangular.one('products/seller/stats').get().toPromise();
  }

  saleStat(): Promise<any> {
    return this.restangular.one('orders/seller/stats/sale').get().toPromise();
  }

}
