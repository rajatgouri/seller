import { Component, OnInit } from '@angular/core';
import { RequestPayoutService } from '../request-payout.service';
import { UtilService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'request-payout-listing',
  templateUrl: './listing.html'
})
export class ListingComponent implements OnInit {

  public isLoading = false;
  public items = [];
  public page: Number = 1;
  public take: Number = 10;
  public total: Number = 0;
  public searchFields: any = {
  };
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public dateFilter: any = {
    startDate: '',
    toDate: ''
  };
  public stats: any;

  constructor(
    private payoutService: RequestPayoutService,
    private toasty: ToastyService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.queryStats();
    this.query();
  }

  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    this.payoutService.search(Object.assign({
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`
    }, this.searchFields))
      .then(resp => {
        this.items = resp.data.items;
        this.total = resp.data.count;
        this.utilService.setLoading(false);
        this.isLoading = false;
      })
      .catch(() => {
        this.toasty.error('Something went wrong, please try again!');
        this.utilService.setLoading(false);
        this.isLoading = false;
      });
  }

  changeUTCDate() {
    if (this.dateFilter.startDate !== '' && this.dateFilter.toDate !== '') {
      const startUTCDate = new Date(this.dateFilter.startDate.year, this.dateFilter.startDate.month - 1, this.dateFilter.startDate.day);
      this.dateFilter.startDate = startUTCDate.toUTCString();
      const toUTCDate = new Date(this.dateFilter.toDate.year, this.dateFilter.toDate.month - 1, this.dateFilter.toDate.day);
      this.dateFilter.toDate = toUTCDate.toUTCString();
      if (startUTCDate > toUTCDate) {
        return 0;
      }
    }
  }

  queryStats() {
    if (this.changeUTCDate() === 0) {
      return this.toasty.error('Start date must be less than end date!');
    }
    const params = {
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate
    };
    this.payoutService.stats(params)
      .then(resp => {
        this.stats = resp.data;
      });
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

}
