import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class CouponService {

  constructor(private restangular: Restangular) { }

  find(params: any): Promise<any> {
    return this.restangular.one('coupons').get(params).toPromise();
  }

  create(data: any): Promise<any> {
    return this.restangular.all('coupons').post(data).toPromise();
  }

  remove(id): Promise<any> {
    return this.restangular.one('coupons', id).customDELETE().toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('coupons', id).get().toPromise();
  }

  update(id, data): Promise<any> {
    return this.restangular.one('coupons', id).customPUT(data).toPromise();
  }
}
