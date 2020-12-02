import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private appLoading = new Subject<any>();
  public appLoading$ = this.appLoading.asObservable();

  constructor() { }

  setLoading(loading: boolean) {
    this.appLoading.next(loading);
  }
}
