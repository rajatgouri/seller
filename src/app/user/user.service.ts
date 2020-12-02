import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private restangular: Restangular) { }

  me(): Promise<any> {
    return this.restangular.one('users', 'me').get().toPromise();
  }

  updateMe(data): Promise<any> {
    return this.restangular.all('users').customPUT(data).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('users', id).get().toPromise();
  }

  complain(params: any): Promise<any> {
    return this.restangular.one('complains').customPOST(params).toPromise();
  }

  findByLoginToken(token): Promise<any> {
    return this.restangular.one('users', token).get().toPromise();
  }
}
