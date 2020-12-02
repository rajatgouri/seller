import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { ConversationService } from '../services/conversation.service';

@Injectable()
export class ConverstionsResolver implements Resolve<Observable<any>> {
  constructor(private service: ConversationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    // search all!
    return this.service.list({ take: 10000 }).then(resp => resp.data.items);
  }
}
