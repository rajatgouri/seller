import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { UtilService } from '../../../shared/services';
import { ToastyService } from 'ng2-toasty';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'payment-history',
  templateUrl: './history.html'
})
export class PaymentHistoryComponent implements OnInit {

  public isLoading = false;
  public packages = [];
  public total: Number = 0;
  public take = 10;
  public page = 1;

  constructor(
    private packageService: PackageService,
    private toasty: ToastyService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.query();
  }

  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    const params = {
      take: this.take,
      page: this.page,
      type: 'shop_featured'
    };
    this.packageService.invoices(params).then(resp => {
      this.packages = resp.data.items;
      this.total = resp.data.count;
      this.utilService.setLoading(false);
      this.isLoading = false;
    }).catch(() => {
      this.toasty.error('Something went wrong, please try again!');
      this.utilService.setLoading(false);
      this.isLoading = false;
    });
  }
}
