import { Pipe, PipeTransform } from '@angular/core';
import { SystemService } from '../services';

/*
 * format price with user currency
*/
@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  private result: any = '0.00';
  private symbol:any = '$';
  constructor(private systemService: SystemService) {
    this.systemService.configs().then(resp => {
      this.symbol = resp.customerCurrencySymbol;
    });

  }

  transform(value: number): any {
    if (!value && value !== 0) {
      return 'N/A';
    }
    value = Number(value) || 0;
    this.result = this.symbol + value.toFixed(2);
    return this.result;
  }
}
