import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShopService {
  constructor(private restangular: Restangular) { }

  me(): Promise<any> {
    return this.restangular.one('shops', 'me').get().toPromise();
  }

  update(id, data): Promise<any> {
    return this.restangular.one('shops', id).customPUT(data).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('shops', id).get().toPromise();
  }
}
