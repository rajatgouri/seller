import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProducttransactiontypeService {

  private allowFields = [
    'name', 'status'
  ];

  constructor(private restangular: Restangular) { }

  search(params: any): Promise<any> {
    return this.restangular.one('producttransactiontype', 'search').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('producttransactiontype', id).get().toPromise();
  }

  findAll(): Promise<any> {
    return this.restangular.one('producttransactiontype').get().toPromise();
  }

  findForDropdown(): Promise<any> {
    return this.restangular.one('producttransactiontype', 'dropdown').get().toPromise();
  }
}
