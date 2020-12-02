import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class ReviewService {

  constructor(private restangular: Restangular) { }

  find(params: any): Promise<any> {
    return this.restangular.one('reviews').get(params).toPromise();
  }
}