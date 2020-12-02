import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class PackageService {

  constructor(private restangular: Restangular) { }

  search(params: any): Promise<any> {
    return this.restangular.one('packages/featured').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('packages/featured', id).get().toPromise();
  }

  invoices(params: any): Promise<any> {
    return this.restangular.one('payment/invoices').get(params).toPromise();
  }
}
