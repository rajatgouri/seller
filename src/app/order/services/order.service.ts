import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class OrderService {

  constructor(private restangular: Restangular) { }

  find(params: any): Promise<any> {
    return this.restangular.one('orders', 'shops').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('orders/details', id).get().toPromise();
  }

  updateStatus(id, data): Promise<any> {
    return this.restangular.one('orders').one('details', id).one('status').customPUT(data).toPromise();
  }

  updateShipping(id, data): Promise<any> {
    return this.restangular.one('orders').one('details', id).one('shipping').customPUT(data).toPromise();
  }

  export(params: any): Promise<any> {
    return this.restangular.one('orders/shops/export/csv').get(params).toPromise();
  }

  makerefund(refund,data): Promise<any> {
    return this.restangular.one('payment/product/refund').customPOST({refund,data}).toPromise();
  }
}
