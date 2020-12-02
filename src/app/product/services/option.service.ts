import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class OptionService {
  constructor(private restangular: Restangular) { }
  search(params: any): Promise<any> {
    return this.restangular.one('products/options').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('products/options', id).get().toPromise();
  }
}
