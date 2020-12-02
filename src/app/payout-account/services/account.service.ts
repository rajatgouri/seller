import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class AccountService {

  constructor(private restangular: Restangular) { }


  countries = [
    {
      "countryName": "India",
      "currencyCode": "INR",
      "countryCode": "IN",
      "states": ["AN", "CH", "DN", "DD", "DL", "LD", "PY", "AP", "AR", "AS", "BR", "CT",
        "GA", "GJ", "HR", "HP", "JK", "JH", "KA", "KL", "MP", "MH", "MN", "ML", "MZ",
        "NL", "OR", "PB", "RJ", "SK", "TN", "TG", "TR", "UP", "UT", "WB"]
    },
    {
      "countryName": "Great Britain",
      "currencyCode": "GBP",
      "countryCode": "GB",
      "states": ["GB"]
    },

    {
      "countryName": "Australia",
      "currencyCode": "AUD",
      "countryCode": "AU",
      "states": ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"]
    },

    {
      "countryName": "Brazil",
      "currencyCode": "BRL",
      "countryCode": "BR",
      "states": ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MG", "PB", "PE", "PI", "RN", "RS", "RO", "RR", "SC", "SE", "SP", "TO", "PA",]
    },

    {
      "countryName": "Canada",
      "currencyCode": "CAD",
      "countryCode": "CA",
      "states": ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK", "NT",
        "NU", "YT",]
    },
    {
      "countryName": "Hong Kong",
      "currencyCode": "HKD",
      "countryCode": "HK",
      "states": ["HK"]
    },
    {
      "countryName": "Japan",
      "currencyCode": "JPY",
      "countryCode": "JP",
      "states": ["23", "05", "02", "38", "21", "10", "34", "01", "18", "40", "07", "28",
        "08", "17", "03", "37", "46", "14", "43", "26", "39", "24", "04", "45", "20",
        "42", "29", "15", "33", "47", "41", "11", "25", "32", "22", "12", "36", "09",
        "31", "16", "13", "30", "06", "35", "19", "44", "27",]
    },
    {
      "countryName": "Mexico",
      "currencyCode": "MXN",
      "countryCode": "MX",
      "states": ["DIF", "AGU", "BCN", "BCS", "CAM", "CHP", "CHH", "COA", "COL",
        "DUR", "GUA", "GRO", "HID", "JAL", "MIC", "MOR", "MEX", "NAY", "NLE", "OAX",
        "PUE", "QUE", "ROO", "SLP", "SIN", "SON", "TAB", "TAM", "TLA", "VER", "YUC", "ZAC",]
    },
    {
      "countryName": "Malaysia",
      "currencyCode": "MYR",
      "countryCode": "MY",
      "states": ["14", "15", "16", "01", "02", "03", "04", "05", "06", "08", "09",
        "07", "12", "13", "10", "11",]
    },

    {
      "countryName": "Singapore",
      "currencyCode": "SGD",
      "countryCode": "SG",
      "states": ["01", "02", "03", "04", "05"]
    },
    {
      "countryName": "United States",
      "currencyCode": "USD",
      "countryCode": "US",
      "states": ["DC", "AS", "GU", "MP", "PR", "UM", "VI", "AL", "AK", "AZ", "AR",
        "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
        "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
        "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
        "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",]
    },
  ]


  getMcc(): Promise<any> {
    return this.restangular.one('assets/mcc.json').get().toPromise();
  }

  find(params: any): Promise<any> {
    return this.restangular.one('payout/accounts').get(params).toPromise();
  }

  create(data: any): Promise<any> {
    return this.restangular.all('payout/accounts').post(data).toPromise();
  }

  remove(id): Promise<any> {
    return this.restangular.one('payout/accounts', id).customDELETE().toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('payout/accounts', id).get().toPromise();
  }

  update(id, data): Promise<any> {
    return this.restangular.one('payout/accounts', id).customPUT(data).toPromise();
  }
}
