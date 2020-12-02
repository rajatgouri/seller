import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestPayoutService {
  constructor(private restangular: Restangular) { }

  getBalance(): Promise<any> {
    return this.restangular.one('payout/balance').get().toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('payout/requests').get(params).toPromise();
  }

  create(data): Promise<any> {
    return this.restangular.all('payout/request').post(data).toPromise();
  }

  stats(params): Promise<any> {
    return this.restangular.one('payout/stats').get(params).toPromise();
  }

  findAccount(params: any): Promise<any> {
    return this.restangular.one('payout/accounts').get(params).toPromise();
  }
}
