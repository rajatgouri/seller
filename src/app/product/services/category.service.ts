import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class ProductCategoryService {
  constructor(private restangular: Restangular) { }
  tree(): Promise<any> {
    return this.restangular.one('products/categories', 'tree').get().toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('products/categories', id).get().toPromise();
  }

  prettyPrint(tree: any, char: string = '', results: any = []) {
    tree.forEach(item => {
      item.name = `${char}${item.name}`;
      results.push(item);
      if (item.children && item.children.length) {
        this.prettyPrint(item.children, `${char}__`, results);
      }
    });

    return results;
  }
}
