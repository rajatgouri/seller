import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class ProductService {
  private allowFields = [
    'name', 
    'alias', 
    'description', 
    'shortDescription', 
    'categoryId', 
    'transactiontypeId',  
    'brandId', 
    'specifications',
    'chemicalIdentifiers', 
    'safetyHandling', 
    'isActive', 
    'metaSeo', 
    'ordering', 
    'freeShip',
    'images', 
    'mainImage', 
    'type', 
    'price', 
    'pricePerWeek',
    'pricePerMonth',
    'startDate',
    'endDate',
    'salePrice', 
    'depositAmont',
    'distance',
    'stockQuantity', 
    'sku', 
    'upc', 
    'mpn', 
    'ean', 
    'digitalFileId',
    'jan', 
    'isbn', 
    'taxClass', 
    'taxPercentage', 
    'restrictCODAreas', 
    'restrictFreeShipAreas', 
    'dailyDeal', 
    'dealTo',
    'zipcode',
    'notification',
    'producttypeId'
  ];

  constructor(private restangular: Restangular) { }

  create(data: any): Promise<any> {
    return this.restangular.all('products').post(_.pick(data, this.allowFields)).toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('products', 'search').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('products', id).get().toPromise();
  }

  publish(data): Promise<any> {
    return this.restangular.all('products/publish').post(data).toPromise();
  }


  update(id, data): Promise<any> {
    return this.restangular.one('products', id).customPUT(_.pick(data, this.allowFields)).toPromise();
  }

  remove(id): Promise<any> {
    return this.restangular.one('products', id).customDELETE().toPromise();
  }

  export(params: any): Promise<any> {
    return this.restangular.one('products/export/csv').get(params).toPromise();
  }
}
