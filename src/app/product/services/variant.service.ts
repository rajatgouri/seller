import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class ProductVariantService {
  private allowFields = [
    'options', 'price', 'salePrice', 'stockQuantity', 'digitalFileId'
  ];

  constructor(private restangular: Restangular) { }

  create(productId: string, data: any): Promise<any> {
    return this.restangular.one('products', productId).one('variants').customPOST(_.pick(data, this.allowFields)).toPromise();
  }

  search(productId: string, params: any): Promise<any> {
    return this.restangular.one('products', productId).one('variants').get(params).toPromise();
  }

  update(productId: string, variantId: string, data): Promise<any> {
    return this.restangular.one('products', productId).one('variants', variantId).customPUT(_.pick(data, this.allowFields)).toPromise();
  }

  remove(productId: string, variantId: string): Promise<any> {
    return this.restangular.one('products', productId).one('variants', variantId).customDELETE().toPromise();
  }
}
