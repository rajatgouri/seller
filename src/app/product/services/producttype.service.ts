import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProducttypeService {

  
  constructor(private restangular: Restangular) { }

  findAll(): Promise<any> {
    return this.restangular.one('producttype').get().toPromise();
  }

  findForDropdown(): Promise<any> {
    return this.restangular.one('producttype', 'dropdown').get().toPromise();
  }
}
